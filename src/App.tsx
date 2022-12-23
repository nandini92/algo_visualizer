import { useState } from "react";
import { Person } from "./model";
import Loop from "./components/Loop";

const App: React.FC = (): any => {
  // Array of men
  const [M, setM ] = useState<Person[]>([
    { id: "m1", preference: [1, 0, 2], engaged: -1 },
    { id: "m2", preference: [1, 0, 2], engaged: -1 },
    { id: "m3", preference: [1, 0, 2], engaged: -1 },
  ]);
  // Array of women
  const [W, setW ]= useState<Person[]>([
    { id: "w1", preference: [0, 1, 2], engaged: -1 },
    { id: "w2", preference: [0, 1, 2], engaged: -1 },
    { id: "w3", preference: [0, 1, 2], engaged: -1 },
  ]);

  // Array to contain stable matches represented by man's index in M
  const [relationship, setRelationship] = useState<number[]>([]);
  const [next, setNext] = useState<boolean>(false);

  const handleClick = () => {
    setNext(true);
  }

  return (
    <div>
      <Loop M={M} W={W} relationship={relationship} next={next} setM={setM} setW={setW} setNext={setNext}/>
      <button onClick={() => handleClick()}>Next Round</button>
    </div>
  );
};

export default App;
