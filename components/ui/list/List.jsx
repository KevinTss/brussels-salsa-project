import { Ul, Li } from './style'

const List = ({ items }) => (
  <Ul>
    {items.map((item, index) => (
      <Li key={index}>{item}</Li>
    ))}
  </Ul>
)

export default List
