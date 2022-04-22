import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { todoState } from "./atoms";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  width: 100%;
`;
const Board = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding-top: 30px;
  padding: 20px 10px;
  border-radius: 5px;
  min-height: 200px;
`;
const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
  padding: 10px 10px;
  border-radius: 5px;
  margin-bottom: 5px;
`;

const App = () => {
  const [todos, setTodos] = useRecoilState(todoState);
  // 드랴그가 끝났을 때 실행되는 함수
  const onDragEnd = () => {
    console.log("Drag end");
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="one">
            {/* Droppable, Draggable 의 children 은 함수형태여야 함! */}
            {/* provided / magic 등으로 불림 */}
            {/* drag and drop 사용할 때 필용한 props 를 다 적을 필요 없이 설정할 수 있도록 해줌 */}
            {(magic) => {
              return (
                <Board {...magic.droppableProps} ref={magic.innerRef}>
                  {todos.map((todo, index) => (
                    <Draggable draggableId={todo} index={index} key={index}>
                      {(provided) => (
                        <Card
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          {todo}
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {magic.placeholder}
                </Board>
              );
            }}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
};

export default App;
