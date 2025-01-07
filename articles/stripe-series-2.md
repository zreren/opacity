 ---
title: Stripe系列(二)：在 Astro 中优雅地接入 Stripe 支付
description: 从实战角度详细介绍如何在 Astro 项目中集成 Stripe 支付功能
date: 2024-03-21
---

上一篇文章我们讲了如何申请 Stripe 账户，这次让我来分享下在 Astro 项目中接入 Stripe 支付的实战经验。我会以一个实际的订阅支付场景为例，展示完整的开发流程。

### 项目准备

首先需要安装必要的依赖：

```bash
# 安装 stripe 和类型支持
npm install stripe @stripe/stripe-js

# 如果需要使用 Stripe Elements
npm install @stripe/stripe-js
```

### 环境配置

1. **创建环境变量**

在项目根目录创建 `.env` 文件：

```env
PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

2. **配置 Stripe 客户端**

创建一个统一的配置文件：

```typescript:src/lib/stripe.ts
import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';

// 服务端 Stripe 实例
export const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16', // 使用最新的 API 版本
  typescript: true,
});

// 客户端 Stripe Promise
export const getStripe = () => {
  return loadStripe(import.meta.env.PUBLIC_STRIPE_PUBLISHABLE_KEY);
};
```

### 实现支付流程

我们以实现一个订阅支付为例，包含前端界面和后端 API。

1. **创建价格商品**

首先在 Stripe 后台创建商品和价格，或者通过 API 创建：

```typescript:src/lib/stripe-products.ts
export async function createProduct() {
  const product = await stripe.products.create({
    name: 'Pro Plan',
    description: '高级会员订阅',
  });

  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: 9900, // $99.00
    currency: 'usd',
    recurring: {
      interval: 'month',
    },
  });

  return { product, price };
}
```

2. **创建支付页面组件**

```typescript:src/components/SubscribeButton.tsx
import { useState } from 'react';
import { getStripe } from '../lib/stripe';

export default function SubscribeButton({ priceId }: { priceId: string }) {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      
      // 调用后端创建 checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });
      
      const { sessionId } = await response.json();
      
      // 重定向到 Stripe Checkout 页面
      const stripe = await getStripe();
      await stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('订阅出错:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleSubscribe}
      disabled={loading}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      {loading ? '处理中...' : '订阅'}
    </button>
  );
}
```

3. **创建后端 API 端点**

```typescript:src/pages/api/create-checkout-session.ts
import type { APIRoute } from 'astro';
import { stripe } from '../../lib/stripe';

export const post: APIRoute = async ({ request }) => {
  try {
    const { priceId } = await request.json();

    // 创建 checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/pricing`,
    });

    return new Response(
      JSON.stringify({ sessionId: session.id }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('创建支付会话失败:', error);
    return new Response(
      JSON.stringify({ error: '创建支付会话失败' }),
      { status: 500 }
    );
  }
};
```

4. **处理 Webhook**

```typescript:src/pages/api/webhook.ts
import type { APIRoute } from 'astro';
import { stripe } from '../../lib/stripe';

export const post: APIRoute = async ({ request }) => {
  const payload = await request.text();
  const sig = request.headers.get('stripe-signature')!;

  try {
    // 验证 webhook 签名
    const event = stripe.webhooks.constructEvent(
      payload,
      sig,
      import.meta.env.STRIPE_WEBHOOK_SECRET
    );

    // 处理不同类型的事件
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        // 处理支付成功逻辑
        await handleSuccessfulPayment(session);
        break;
      case 'customer.subscription.updated':
        // 处理订阅更新
        break;
      case 'customer.subscription.deleted':
        // 处理订阅取消
        break;
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (err) {
    console.error('Webhook 错误:', err);
    return new Response(
      JSON.stringify({ error: 'Webhook 处理失败' }),
      { status: 400 }
    );
  }
};

async function handleSuccessfulPayment(session: any) {
  // 实现你的业务逻辑
  // 例如：更新数据库、发送邮件等
}
```

### 实现订阅管理

1. **创建客户门户会话**

```typescript:src/pages/api/create-portal-session.ts
import type { APIRoute } from 'astro';
import { stripe } from '../../lib/stripe';

export const post: APIRoute = async ({ request }) => {
  try {
    const { customerId } = await request.json();

    // 创建客户门户会话
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${request.headers.get('origin')}/account`,
    });

    return new Response(
      JSON.stringify({ url: session.url }),
      { status: 200 }
    );
  } catch (error) {
    console.error('创建门户会话失败:', error);
    return new Response(
      JSON.stringify({ error: '创建门户会话失败' }),
      { status: 500 }
    );
  }
};
```

### 处理错误和边界情况

1. **错误处理组件**

```typescript:src/components/PaymentError.tsx
export default function PaymentError({ error }: { error: Error }) {
  return (
    <div className="p-4 bg-red-50 text-red-700 rounded">
      <h3 className="font-bold">支付出错</h3>
      <p>{error.message}</p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-2 text-sm underline"
      >
        重试
      </button>
    </div>
  );
}
```

2. **加载状态处理**

```typescript:src/components/PaymentLoading.tsx
export default function PaymentLoading() {
  return (
    <div className="flex items-center space-x-2">
      <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent" />
      <span>处理中...</span>
    </div>
  );
}
```

### 最佳实践和注意事项

1. **安全考虑**
   - 永远不要在前端暴露 Secret Key
   - 验证所有的 webhook 签名
   - 实现请求速率限制

2. **性能优化**
   - 按需加载 Stripe.js
   - 使用 Suspense 和 loading 状态
   - 实现错误重试机制

3. **用户体验**
   - 提供清晰的支付流程提示
   - 实现优雅的错误处理
   - 添加支付状态反馈

### 测试

1. **本地测试**
```bash
# 使用 stripe cli 进行本地测试
stripe listen --forward-to localhost:3000/api/webhook
```

2. **测试用例**
```typescript:src/tests/stripe.test.ts
import { describe, it, expect } from 'vitest';
import { createCheckoutSession } from '../lib/stripe';

describe('Stripe 支付测试', () => {
  it('应该成功创建 checkout session', async () => {
    const session = await createCheckoutSession('price_123');
    expect(session).toHaveProperty('id');
  });
});
```

### 总结

在 Astro 中集成 Stripe 支付虽然需要考虑很多细节，但只要架构设计合理，代码组织得当，整个集成过程还是比较顺畅的。建议：

- 充分利用 TypeScript 类型系统
- 实现完善的错误处理
- 做好本地测试
- 注意安全性考虑

---

**实用提示**：
- 开发时使用 Stripe CLI 进行本地测试
- 善用 Stripe 的测试模式
- 保持代码的可维护性
- 注意处理各种边界情况

> 下一篇我们将详细讨论 Stripe 的订阅管理和客户门户的实现，敬请期待！