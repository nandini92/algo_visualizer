import { Person } from "../model";
import { useEffect, useState } from "react";
import styled from "styled-components";

const GsAlgo: React.FC = () => {
  // Array of men
  const [M, setM] = useState<Person[]>([
    { id: "Alex", preference: [1, 0, 2], engaged: -1 },
    { id: "Brian", preference: [1, 0, 2], engaged: -1 },
    { id: "Dan", preference: [1, 0, 2], engaged: -1 },
  ]);
  // Array of women
  const [W, setW] = useState<Person[]>([
    { id: "Linda", preference: [0, 1, 2], engaged: -1 },
    { id: "June", preference: [0, 1, 2], engaged: -1 },
    { id: "Kate", preference: [0, 1, 2], engaged: -1 },
  ]);

  // Array to contain stable matches represented by man's index in M
  const [relationship, setRelationship] = useState<number[]>([]);
  const [next, setNext] = useState<boolean>(false);

  // While there are men that are not engaged, loop through their preference for women.
  let tempM: Person[] = [...M];
  let tempW: Person[] = [...W];

  useEffect(() => {
    if (relationship.length < M.length && next === true) {
      tempM.forEach((man: Person, index: number) => {
        man.engaged === -1 &&
          man.preference.some((woman) => {
            const prefWoman: Person = tempW[woman];

            // Loop through the woman's preference to see if the man ranks higher in her preference list than the man she is engaged to
            return prefWoman.preference.some((p) => {
              // If man ranks higher than engaged, update engaged values to reflect correct indexes. Free man will be set to -1 and removed from S.
              if (p === index && p > prefWoman.engaged) {
                if (prefWoman.engaged !== -1) {
                  relationship.splice(
                    relationship.indexOf(prefWoman.engaged),
                    1
                  );
                  tempM[prefWoman.engaged].engaged = -1;
                }

                prefWoman.engaged = index;
                man.engaged = woman;

                relationship.push(index);

                console.log(relationship);
                return true;
              }
            });
          });
      });

      setM(tempM);
      setW(tempW);
      setNext(false);
    }
  }, [next]);

  // Shuffle function based on Fisher-Yates shuffle algo
  const shuffle = (array: number[]): number[] => {
    let m: number = array.length;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      let i: number = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      let t: number = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
  }

  // Function to randomize preferences
  const handleRandomize = () => {
    tempM = [
      { id: "Alex", preference: shuffle([0, 1, 2]), engaged: -1 },
      { id: "Brian", preference: shuffle([0, 1, 2]), engaged: -1 },
      { id: "Dan", preference: shuffle([0, 1, 2]), engaged: -1 },
    ];
    tempW = [
      { id: "Linda", preference: shuffle([0, 1, 2]), engaged: -1 },
      { id: "June", preference: shuffle([0, 1, 2]), engaged: -1 },
      { id: "Kate", preference: shuffle([0, 1, 2]), engaged: -1 },
    ];

    setM(tempM);
    setW(tempW);
    setRelationship([]);
  }

  // Function to kick off next sequence in the algo loop
  const handleClick = () => {
    setNext(true);
  };

  // Function to reset loop
  const handleReset = () => {
    tempM = [
      { id: "Alex", preference: [1, 0, 2], engaged: -1 },
      { id: "Brian", preference: [1, 0, 2], engaged: -1 },
      { id: "Dan", preference: [1, 0, 2], engaged: -1 },
    ];
    tempW = [
      { id: "Linda", preference: [0, 1, 2], engaged: -1 },
      { id: "June", preference: [0, 1, 2], engaged: -1 },
      { id: "Kate", preference: [0, 1, 2], engaged: -1 },
    ];

    setM(tempM);
    setW(tempW);
    setRelationship([]);
  };

  return (
    <Container>
      <Title>Gale-Shapley Algorithm</Title>
      <Options>
        {relationship.length === 0 && <Button onClick={() => handleRandomize()}>Randomize</Button>}
        {relationship.length < M.length && <Button onClick={() => handleClick()}>Next Round</Button>}
        <Button onClick={() => handleReset()}>Reset</Button>
      </Options>
      <Wrapper>
        <Algorithm>
          <Set>
            {M.map((i) => (
              <Block key={i.id}>
                <p>{i.id}'s preference:</p>
                <Preference>
                  {i.preference.map((p) => (
                    <People>{W[p].id}</People>
                  ))}
                </Preference>
                {i.engaged === -1 ? (
                  <p>
                    {" "}
                    <Name>{i.id}</Name> is not engaged
                  </p>
                ) : (
                  <p>
                    <Name>{i.id}</Name> is engaged to{" "}
                    <Name>{W[i.engaged].id}</Name>
                  </p>
                )}
              </Block>
            ))}
          </Set>
          <Set>
            {W.map((i) => (
              <Block key={i.id}>
                <p>{i.id}'s preference:</p>
                <Preference>
                  {i.preference.map((p) => (
                    <People>{M[p].id}</People>
                  ))}
                </Preference>
                {i.engaged === -1 ? (
                  <p>
                    <Name>{i.id}</Name> is not engaged
                  </p>
                ) : (
                  <p>
                    <Name>{i.id}</Name> is engaged to{" "}
                    <Name>{M[i.engaged].id}</Name>
                  </p>
                )}
              </Block>
            ))}
          </Set>
        </Algorithm>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Wrapper = styled.div`
  padding: 30px;
  align-self: center;
`;
const Title = styled.h1`
  margin: 20px;
`;
const Algorithm = styled.div`
  display: flex;
`;
const Set = styled.div`
  margin: 0px 20px;
  padding: 10px;
  border-radius: 10px;
  background: linear-gradient(120deg, #e60ee6, #00005e);
  box-shadow: 0px 0px 8px #585858;
`;
const Block = styled.div`
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  background: #f0efef;
`;
const People = styled.p`
  border-radius: 10px;
  margin: 5px;
  padding: 10px;
  box-shadow: 0px 0px 8px #585858;
`;
const Name = styled.span`
  font-weight: bold;
  color: #00005e;
`;
const Preference = styled.div`
  display: flex;
  margin: 10px;
`;
const Options = styled.div`
  display: flex;
  margin-left: 20px;
`
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
export default GsAlgo;
