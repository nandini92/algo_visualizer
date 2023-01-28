import { useEffect, useState } from "react";
import styled from "styled-components";

import { Moments } from "../model";
import { mergeSort } from "../assets/MergeSort";

const SortingVisualizer: React.FC = () => {
  //Array of numbers to be sorted
  const [array, setArray] = useState<number[]>([]);

  // Array containing animations to be displayed
  const [animations, setAnimations] = useState<Moments[]>([]);
  const [highlighted, setHighlighted] = useState<number[]>([]);

  useEffect(() => {
    setArray(resetArray(20, 700));
  }, []);

  // useEffect to display animations when returned from mergeSort helper
  useEffect(() => {
    if (animations !== undefined) {
      for (let i = 1; i <= animations.length; i++) {
        setTimeout(() => {
          setArray([...animations[i]["wholeArray"]]);
          setHighlighted([...animations[i]["highlighted"]]);
        }, 20 * i);
      }
    }
  }, [animations]);

  return (
    <Container>
      <Title>Sorting Algorithms</Title>
      <Options>
        <Button
          onClick={() => {
            setArray(resetArray(20, 700));
            setAnimations([]);
            setHighlighted([]);
          }}
        >
          Generate New Array
        </Button>
        <Button onClick={() => setAnimations(mergeSort(array))}>
          Merge Sort
        </Button>
      </Options>
      <Chart>
        {array.length === 0 ? (
          <p>Loading</p>
        ) : (
          array.map((e, i) => (
            <Bar
              key={i}
              height={e}
              target={highlighted[0] === i}
              highlighted={highlighted.includes(i)}
            ></Bar>
          ))
        )}
      </Chart>
    </Container>
  );
};

const resetArray = (min: number, max: number) => {
  const temp: number[] = [];

  for (let i = 0; i < 200; i++) {
    temp.push(Math.floor(Math.random() * (max - min) + min));
  }

  return temp;
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.h1`
  margin: 20px;
  align-self: flex-start;
`;
const Options = styled.div`
  display: flex;
  align-self: flex-start;
  margin-left: 20px;
`;
const Button = styled.div`
  padding: 10px;
  outline: none;
  background: #00005e;
  color: white;
  width: fit-content;
  border-radius: 10px;
  margin: 10px;
  cursor: pointer;
`;
const Chart = styled.div`
  position: absolute;
  bottom: 0px;
  width: 80%;
  height: 80vh;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-end;
`;
const Bar = styled.div`
  //TBD : setting prop type
  height: ${(props: any) => `${props.height}px`};
  width: 3px;
  background-color: ${(props: any) =>
    props.highlighted ? "red" : "cornflowerblue"};
`;

export default SortingVisualizer;
