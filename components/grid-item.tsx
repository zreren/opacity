import NextLink from 'next/link'
import Image from 'next/image'
import { Box, Text, LinkBox, LinkOverlay, Icon } from '@chakra-ui/react'
import { Global } from '@emotion/react'

export const GridItem = ({ children, href, title, thumbnail }) => (
  <Box w="100%" textAlign="center">
    <LinkBox cursor="pointer">
      <Image
        src={thumbnail}
        alt={title}
        className="grid-item-thumbnail"
        placeholder="blur"
        loading="lazy"
      />
      <LinkOverlay href={href} target="_blank">
        <Text mt={2}>{title}</Text>
      </LinkOverlay>
      <Text fontSize={14}>{children}</Text>
    </LinkBox>
  </Box>
)
interface TWorkGridItem {
  children: any
  id: any
  title: string
  thumbnail: string
  Icon?: any
}
export const WorkGridItem: any = ({
  children,
  id,
  title,
  thumbnail,
  Icon,
  path,
  locale
}) => (
  <Box w="100%" textAlign="center">
    <NextLink
      href={{ pathname: `${path}`, query: { id: id } }}
      passHref
      locale={locale}
      scroll={false}
    >
      <LinkBox cursor="pointer">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            className="grid-item-thumbnail"
            blurDataURL={thumbnail}
            height={160}
            width={300}
            sizes="(min-width:200px) 100%,
            height:160px
            "
            placeholder="blur"
          />
        ) : (
          <Box
            height="160px"
            width="100%"
            bg="gray.100"
            borderRadius="12px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="24px" fontWeight="bold" color="gray.600">
              {title}
            </Text>
          </Box>
        )}
        <LinkOverlay
          mt={2}
          gap={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
          href={`/works/${id}`}
        >
          {Icon ? <Icon></Icon> : null}
          <Text fontSize={20}>{title}</Text>
        </LinkOverlay>
        <Text fontSize={14}>{children}</Text>
      </LinkBox>
    </NextLink>
  </Box>
)

export const GridItemStyle = () => (
  <Global
    styles={`
      .grid-item-thumbnail {
        border-radius: 12px;
      }
    `}
  />
)
