import React, { useState, useEffect } from 'react';

const BubbleSort: React.FC = () => {
  const [sortLength, setSortLength] = useState(10);
  const [arrList, setArrList] = useState<number[]>([]);
  const [speed, setSpeed] = useState(500);
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    const getNumber = (min: number, max: number) => {
      return Math.floor(Math.random() * max) + min;
    };

    let arr: number[] = [];
    let used: number[] = [];
    let count = sortLength;

    for (let i = 0; i < sortLength; i++) {
      let num = getNumber(1, sortLength);
      if (!used.includes(num)) {
        arr[i] = num;
        used[i] = num;
      } else {
        while (count > 0) {
          if (!used.includes(count)) {
            arr[i] = count;
            used[i] = count;
            break;
          }
          count--;
        }
      }
    }

    setArrList([...arr]);
  }, [sortLength]);

  const renderNumbers = arrList.map((arr, index) => (
    <div key={index} className="bubble-sort__box">
      {arr}
    </div>
  ));

  const renderNumberOptions = () => {
    let result = [];

    for (let i = 1; i <= 100; i++) {
      result.push(<option value={i}>{i}</option>);
    }

    return result;
  };

  const handleSelectBoxes = (e: React.FormEvent) => {
    const target = e.target as HTMLSelectElement;
    setSortLength(parseInt(target.value));

    const boxes = document.querySelectorAll('.bubble-sort__box');

    boxes.forEach((box) => {
      box.classList.remove('bubble-sort__box--disabled');
    });
  };

  const handleSelectSpeed = (e: React.FormEvent) => {
    const target = e.target as HTMLSelectElement;
    setSpeed(parseInt(target.value));
  };

  const bubbleSort = async () => {
    let arr = [...arrList];
    let unsortedUntilIndex = arr.length - 1;
    let sorted = false;
    const boxes = document.querySelectorAll('.bubble-sort__box');

    const waitForMoves = (arr: number[], i: number) => {
      return new Promise((resolve) => {
        let first = arr[i];
        let second = arr[i + 1];
        if (first > second) {
          setSteps((prevSteps) => prevSteps + 1);

          boxes.item(i).classList.add('bubble-sort__box--active');
          boxes.item(i + 1).classList.add('bubble-sort__box--active');

          arr[i] = second;
          arr[i + 1] = first;
          sorted = false;
          setArrList([...arr]);
        }
        setTimeout(resolve, speed);
      });
    };

    while (!sorted) {
      sorted = true;

      for (let i = 0; i < unsortedUntilIndex; i++) {
        boxes.forEach((box) => {
          box.classList.remove('bubble-sort__box--active');
        });

        setSteps((prevSteps) => prevSteps + 1);

        await waitForMoves(arr, i);
      }
      unsortedUntilIndex--;

      boxes.forEach((box, index) => {
        if (index > unsortedUntilIndex) {
          box.classList.remove('bubble-sort__box--active');
          box.classList.add('bubble-sort__box--disabled');
        }
      });
    }
    boxes.forEach((box) => {
      box.classList.add('bubble-sort__box--disabled');
    });
  };

  return (
    <>
      <select onChange={handleSelectBoxes} value={sortLength}>
        {renderNumberOptions().map((opt) => opt)}
      </select>
      <select onChange={handleSelectSpeed} value={speed}>
        <option value="0">0s</option>
        <option value="100">.1s</option>
        <option value="500">.5s</option>
        <option value="1000">1s</option>
        <option value="2000">2s</option>
        <option value="3000">3s</option>
        <option value="4000">4s</option>
        <option value="5000">5s</option>
      </select>
      <div className="bubble-sort">{renderNumbers}</div>
      <button onClick={bubbleSort}>Sort</button>
      <p>Steps: {steps}</p>
      <p>Efficiency: 0(N&#xb2;)</p>
    </>
  );
};

export default BubbleSort;
