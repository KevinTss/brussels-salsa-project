import PropTypes from 'prop-types'

import { Container, Text, Image } from './style'

const Avatar = ({ firstName, lastName, size, image }) => {
  const initials = `${firstName ? firstName.charAt(0).toUpperCase() : '?'}${
    lastName ? lastName.charAt(0).toUpperCase() : '?'
  }`

  return (
    <Container size={size} hasBorder={!image}>
      {image ? (
        <Image src={image} alt='user-avatar' />
      ) : (
        <Text size={size}>{initials}</Text>
      )}
    </Container>
  )
}

Avatar.defaultProps = {
  size: 'm',
}

Avatar.propTypes = {
  size: PropTypes.oneOf(['m', 'l', 'xxl']),
}

export default Avatar
