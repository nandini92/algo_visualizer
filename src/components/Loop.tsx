import { Person } from "../model";
import { useEffect } from "react";
import styled from "styled-components";

interface Props {
  M: Person[];
  W: Person[];
  relationship: number[];
  next: boolean;
  setM: React.Dispatch<React.SetStateAction<Person[]>>;
  setW: React.Dispatch<React.SetStateAction<Person[]>>;
  setNext: React.Dispatch<React.SetStateAction<boolean>>;
}

const Loop: React.FC<Props> = ({ M, W, relationship, next, setM, setW, setNext }): any => {
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
                  relationship.splice(relationship.indexOf(prefWoman.engaged), 1);
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
  }, [next])

  return (
    <>
      <div>
        {M.map((i) => (
          <p key={i.id}>
            man {i.id} is engaged to woman {i.engaged}
          </p>
        ))}
      </div>
      <div>
        {W.map((i) => (
          <p key={i.id}>
            woman {i.id} is engaged to man {i.engaged}
          </p>
        ))}
      </div>
    </>
  );
};

export default Loop;
