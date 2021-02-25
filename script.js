// Variable Declaration

const buttonRight = document.querySelector ('.buttons__right');
const buttonLeft = document.querySelector ('.buttons__left');
const buttonTop = document.querySelector ('.buttons__top');
const buttonBottom = document.querySelector ('.buttons__bottom');

const score = document.querySelector ('.score');

const cell00 = document.querySelector ('.container__content-0-0');
const cell01 = document.querySelector ('.container__content-0-1');
const cell02 = document.querySelector ('.container__content-0-2');
const cell03 = document.querySelector ('.container__content-0-3');

const cell10 = document.querySelector ('.container__content-1-0');
const cell11 = document.querySelector ('.container__content-1-1');
const cell12 = document.querySelector ('.container__content-1-2');
const cell13 = document.querySelector ('.container__content-1-3');

const cell20 = document.querySelector ('.container__content-2-0');
const cell21 = document.querySelector ('.container__content-2-1');
const cell22 = document.querySelector ('.container__content-2-2');
const cell23 = document.querySelector ('.container__content-2-3');

const cell30 = document.querySelector ('.container__content-3-0');
const cell31 = document.querySelector ('.container__content-3-1');
const cell32 = document.querySelector ('.container__content-3-2');
const cell33 = document.querySelector ('.container__content-3-3');

const cells = [cell00, cell01, cell02, cell03, cell10, cell11, cell12, cell13, cell20, cell21, cell22, cell23, cell30, cell31, cell32, cell33, 0];
let cellAllocated = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function printCellContent () {
    let s = ''
    for (let i = 0; i < 16; i++) {
        if (i % 4 === 0 && i > 0) {
            console.log(s);
            s = '';
        }
        if (cellAllocated[i] === 1) {
            s = s.concat (cells[i].innerHTML);
            s = s.concat (' ');
        }
        else if (cellAllocated[i] === 0) {
            s = s.concat ('. ');
        }
    }
    console.log(s);
}
function printCellAllocation () {
    let s = ''
    for (let i = 0; i < 16; i++) {
        if (i % 4 === 0 && i > 0) {
            console.log(s);
            s = '';
        }
        if (cellAllocated[i] === 1) {
            s = s.concat ('Y');
            s = s.concat (' ');
        }
        else if (cellAllocated[i] === 0) {
            s = s.concat ('. ');
        }
    }
    console.log(s);
}

function getRandom (start, end) {
    return Math.floor(Math.random() * (end- start + 1)) + start;
}

function resetGame () {
    for (let i = 0; i < 16; i++) {
        cellAllocated[i] = 0;
        if (cells[i].classList.contains ('container__content-hide') === false) {
            cells[i].classList.add ('container__content-hide');
        }
    }
    document.querySelector ('.container').classList.remove ('container-over');
    document.querySelector ('.container-over-text').classList.add('container-over-text-hide');
    score.innerHTML = 0;
    resetValue ();
    applyStartCells ();
}

function gameOver () {
    document.querySelector ('.container').classList.add ('container-over');
    document.querySelector ('.container-over-text').classList.remove ('container-over-text-hide');
}

function getStartCells () {
    let firstCell = getRandom (0, 15);
    let secondCell = getRandom (0, 15);
    while (secondCell === firstCell) {
        secondCell = getRandom (0, 15);
    }
    return [firstCell, secondCell]
}

function applyStartCells () {
    let [a, b] = getStartCells ();
    const chosenFirstCell = cells[a];
    const chosenSecondCell = cells[b];
    chosenFirstCell.classList.remove ('container__content-hide');
    chosenSecondCell.classList.remove ('container__content-hide');
    cellAllocated[a] = 1;
    cellAllocated[b] = 1;
    
}

function resetValue () {
    for (let i = 0; i < 16; i++) {
        if (cellAllocated[i] === 0)
            cells[i].innerHTML = 2;
            cells[i].style.backgroundColor = 'rgba(131,74,61, .2)';
            cells[i].classList.remove ('container__content-scale-up');
    }
}

function colorCells () {
    for (let i = 0; i < 16; i++) {
        if (parseInt (cells[i].innerHTML) === 2)
            cells[i].style.backgroundColor = 'rgba(131,74,61, .2)';
        else if (parseInt (cells[i].innerHTML) === 4)
            cells[i].style.backgroundColor = 'rgba(131,74,61, .3)';
        else if (parseInt (cells[i].innerHTML) === 8)
            cells[i].style.backgroundColor = 'rgba(131,74,61, .4)';
        else if (parseInt (cells[i].innerHTML) === 16)
            cells[i].style.backgroundColor = 'rgba(131,74,61, .5)'; 
        else if (parseInt (cells[i].innerHTML) === 32)
            cells[i].style.backgroundColor = 'rgba(131,74,61, .6)';
        else if (parseInt (cells[i].innerHTML) === 64)
            cells[i].style.backgroundColor = 'rgba(131,74,61, .7)';
        else if (parseInt (cells[i].innerHTML) === 128)
            cells[i].style.backgroundColor = 'rgba(131,74,61, .8)';
        else if (parseInt (cells[i].innerHTML) === 256)
            cells[i].style.backgroundColor = 'rgba(131,74,61, .9)';
        else if (parseInt (cells[i].innerHTML) === 512)
            cells[i].style.backgroundColor = 'rgba(131,74,61, 1)';

    }
}

function gameoverCheck () {
    for (let i = 0; i < 16; i++) {
        if (i % 4 === 3 && Math.floor (i / 4) === 3) 
            continue;
        else if (i % 4 === 3) {
            if (parseInt (cells[i + 4].innerHTML) === parseInt (cells[i].innerHTML) || parseInt (cells[i - 1].innerHTML) === parseInt (cells[i].innerHTML)) {
                return -1;
            }
        }
        else if (Math.floor (i / 4) === 3) {
            if (parseInt (cells[i + 1].innerHTML) === parseInt (cells[i].innerHTML) || parseInt (cells[i - 4].innerHTML) === parseInt (cells[i].innerHTML)) {
                return -1;
            }
        }
        else {
            if (parseInt (cells[i + 1].innerHTML) === parseInt (cells[i].innerHTML) || parseInt (cells[i + 4].innerHTML) === parseInt (cells[i].innerHTML)) {
                return -1;
            }
        }
    }
    for (let i = 0; i < 16; i++) {
        if (cellAllocated[i] === 0)
            return -1;
    }
    return 0;
}

function fullCellAllocation () {
    for (let i = 0; i < 16; i++) {
        if (cellAllocated[i] === 0)
            return -1;
    }
    return 0;
}

function addOneCell () {
    resetValue ();
    colorCells ();
    if (gameoverCheck () === 0) {
        gameOver ();
        return;
    }
    if (fullCellAllocation () === 0) {
        return;
    }
    let cnt = 0;
    let chosenCellIndex = getRandom (0, 15);
    while (cellAllocated[chosenCellIndex] === 1) {
        chosenCellIndex = getRandom (0, 15);
        cnt++;

        // full matrix condition
        if (cnt == 500) {
            break;
        }
    }
    
    cells[chosenCellIndex].classList.add ('container__content-scale-up');
    setTimeout (function () {cells[chosenCellIndex].classList.remove ('container__content-hide')}, 300);
    cellAllocated[chosenCellIndex] = 1;
}

function scoreCalc () {
    let scoreCnt = 0;
    for (let i = 0; i < 16; i++) {
        if (cellAllocated[i] === 1)
            scoreCnt += parseInt (cells[i].innerHTML);
    }
    score.innerHTML = scoreCnt;
}

function handlePostMove (clickedButton) {
    // add new cell after moving the current cells
    setTimeout (function () {addOneCell ()}, 200);
    clickedButton.classList.add ('buttons-click');
    setTimeout (function () {clickedButton.classList.remove ('buttons-click');}, 200);
    setTimeout (function () {scoreCalc ()}, 300);

    // for debugging purposes
    // printCellAllocation ();
    // console.log('----------');
    // printCellContent ();
    // console.log('--------------------');
}

function handleAuxiliaryMerge (moveName, cellIndex, nextIndex) {
    cells[cellIndex].classList.add (moveName);
    setTimeout (function () {cells[cellIndex].classList.remove (moveName)}, 100);
    setTimeout (function () {cells[cellIndex].classList.add ('container__content-hide')}, 1);
    cellAllocated[cellIndex] = 0;
    cellAllocated[nextIndex] = 1;
    cells[nextIndex].innerHTML = parseInt (cells[cellIndex].innerHTML) + parseInt (cells[nextIndex].innerHTML);
}

function handleAuxiliary (moveName, cellIndex, nextIndex) {
    cells[nextIndex].innerHTML = cells[cellIndex].innerHTML;
    cells[cellIndex].classList.add (moveName);
    setTimeout (function () {cells[cellIndex].classList.remove (moveName)}, 30);
    setTimeout (function () {cells[cellIndex].classList.add ('container__content-hide')}, 25);
    setTimeout (function () {cells[nextIndex].classList.remove ('container__content-hide')}, 30);
    setTimeout (function () {cellAllocated[cellIndex] = 0}, 30);
    cellAllocated[nextIndex] = 1;
    return new Promise (function (resolve, reject) {
        setTimeout (function () {resolve()}, 30);
    });   
    
}

function handleRight () {
    // handle merging
    for (let i = 0 ; i < 16; i++) {
        if (cellAllocated[i] === 1) {
            // last condition is: the two cells are on the same row
            if (cellAllocated[i + 1] === 1 && cells[i + 1].innerHTML === cells[i].innerHTML && parseInt (i / 4) === parseInt ((i + 1) / 4)) {
                handleAuxiliaryMerge ('move-1-right', i, i + 1);
            }
            if (cellAllocated[i + 2] === 1 && cellAllocated[i + 1] === 0 && cells[i + 2].innerHTML === cells[i].innerHTML && parseInt (i / 4) === parseInt ((i + 2) / 4)) {
                handleAuxiliaryMerge ('move-2-right', i, i + 2);
            }
        
            if (cellAllocated[i + 3] === 1 && cellAllocated[i + 1] === 0 && cellAllocated[i + 2] === 0 && cells[i + 3].innerHTML === cells[i].innerHTML && parseInt (i / 4) === parseInt ((i + 3) / 4)) {
                handleAuxiliaryMerge ('move-3-right', i, i + 3);
            }
        }
    }

    // handle moving
    for (let i = 0 ; i < 16; i++) {
        if (cellAllocated[i] === 1) {
            let moveCounter = 0;
            let rowIndex = i % 4;
            let currentIndex = i;
            while (rowIndex < 3 && cellAllocated[currentIndex + 1] === 0) { // add a redundant element in cellAllocated array
                currentIndex++;
                rowIndex++;
                moveCounter++;
            }
            // make sure that the next cell is on the current row
            if (moveCounter === 1) {
                async function internal () {
                    await handleAuxiliary ('move-1-right', i, i + moveCounter);
                    for (let j = i - 1; j >= i - i % 4; j--) {
                        if (cellAllocated[j] === 0) {
                            continue;
                        }
                        await handleAuxiliary ('move-1-right', j, j + moveCounter);
                    }
                } 
                internal ();
            }
            
            else if (moveCounter === 2) {
                async function internal () {
                    await handleAuxiliary ('move-2-right', i, i + moveCounter);
                    for (let j = i - 1; j >= i - i % 4; j--) {
                        if (cellAllocated[j] === 0) {
                            continue;
                        }
                        await handleAuxiliary ('move-2-right', j, j + moveCounter);
                    }
                } 
                internal ();
            }

            else if (moveCounter === 3) {
                async function internal () {
                    await handleAuxiliary ('move-3-right', i, i + moveCounter);
                    for (let j = i - 1; j >= i - i % 4; j--) {
                        if (cellAllocated[j] === 0) {
                            continue;
                        }
                        await handleAuxiliary ('move-3-right', j, j + moveCounter);
                    }
                } 
                internal ();
            }      
        }
    }
    handlePostMove (buttonRight);
}

function handleLeft () {
    for (let i = 0 ; i < 16; i++) {
        if (cellAllocated[i] === 1) {
            // last condition is: the two cells are on the same row
            if (cellAllocated[i - 1] === 1 && cells[i - 1].innerHTML === cells[i].innerHTML && parseInt (i / 4) === parseInt ((i - 1) / 4)) {
                handleAuxiliaryMerge ('move-1-left', i, i - 1);
            }
            if (cellAllocated[i - 2] === 1 && cellAllocated[i - 1] === 0 && cells[i - 2].innerHTML === cells[i].innerHTML && parseInt (i / 4) === parseInt ((i - 2) / 4)) {
                handleAuxiliaryMerge ('move-2-left', i, i - 2);
            }
        
            if (cellAllocated[i - 3] === 1 && cellAllocated[i - 1] === 0 && cellAllocated[i - 2] === 0 && cells[i - 3].innerHTML === cells[i].innerHTML && parseInt (i / 4) === parseInt ((i - 3) / 4)) {
                handleAuxiliaryMerge ('move-3-left', i, i - 3);
            }
        }
    }
    for (let i = 0 ; i < 16; i++) {
        if (cellAllocated[i] === 1) {
            let moveCounter = 0;
            let rowIndex = i % 4;
            let currentIndex = i;
            while (rowIndex > 0 && cellAllocated[currentIndex - 1] === 0) { // add a redundant element in cellAllocated array
                currentIndex--;
                rowIndex--;
                moveCounter++;
            }
            if (moveCounter === 1) {
                async function internal () {
                    await handleAuxiliary ('move-1-left', i, i - moveCounter);
                    for (let j = i + 1; j < (4 - i % 4 + i); j++) {
                        if (cellAllocated[j] === 0) {
                            continue;
                        }
                        await handleAuxiliary ('move-1-left', j, j - moveCounter);
                    }
                } 
                internal ();
            }
            
            else if (moveCounter === 2) {
                async function internal () {
                    await handleAuxiliary ('move-2-left', i, i - moveCounter);
                    for (let j = i + 1; j < (4 - i % 4 + i); j++) {
                        if (cellAllocated[j] === 0) {
                            continue;
                        }
                        await handleAuxiliary ('move-2-left', j, j - moveCounter);
                    }
                } 
                internal ();
        }

            else if (moveCounter === 3) {
                async function internal () {
                    await handleAuxiliary ('move-3-left', i, i - moveCounter);
                    for (let j = i + 1; j < (4 - i % 4 + i); j++) {
                        if (cellAllocated[j] === 0) {
                            continue;
                        }
                        await handleAuxiliary ('move-3-left', j, j - moveCounter);
                    }
                } 
                internal ();
            }      
        }
    }
    handlePostMove (buttonLeft);
}

function handleTop () {
    for (let i = 0 ; i < 16; i++) {
        if (cellAllocated[i] === 1) {
            // last condition is: the two cells are on the same row
            if (cellAllocated[i - 4] === 1 && cells[i - 4 * 1].innerHTML === cells[i].innerHTML && parseInt (i % 4) === parseInt ((i - 4 * 1) % 4)) {
                handleAuxiliaryMerge ('move-1-top', i, i - 4 * 1);
            }
            if (cellAllocated[i - 4 * 2] === 1 && cellAllocated[i - 4] === 0 &&  cells[i - 4 * 2].innerHTML === cells[i].innerHTML && parseInt (i % 4) === parseInt ((i - 4 * 2) % 4)) {
                handleAuxiliaryMerge ('move-2-top', i, i - 4 * 2);
            }
        
            if (cellAllocated[i - 4 * 3] === 1 && cellAllocated[i - 4] === 0 && cellAllocated[i - 2 * 4] === 0 && cells[i - 4 * 3].innerHTML === cells[i].innerHTML && parseInt (i % 4) === parseInt ((i - 4 * 3) % 4)) {
                handleAuxiliaryMerge ('move-3-top', i, i - 4 * 3);
            }
        }
    }

    for (let i = 0 ; i < 16; i++) {
        if (cellAllocated[i] === 1) {
            let moveCounter = 0;
            let rowIndex = Math.ceil (i / 4);
            let currentIndex = i;
            while (rowIndex > 0 && cellAllocated[currentIndex - 4] === 0) { // add a redundant element in cellAllocated array
                currentIndex -= 4;
                rowIndex -= 1;
                moveCounter++;
            }
            // make sure that the next cell is on the current row
            if (moveCounter === 1) {
                async function internal () {
                    await handleAuxiliary ('move-1-top', i, i - moveCounter * 4);
                    for (let j = i + 4; j < 16; j += 4) {
                        if (cellAllocated[j] === 0) {
                            continue;
                        }
                        await handleAuxiliary ('move-1-top', j, j - moveCounter * 4);
                    }
                } 
                internal ();
            }
            
            else if (moveCounter === 2) {
                async function internal () {
                    await handleAuxiliary ('move-2-top', i, i - moveCounter * 4);
                    for (let j = i + 4; j < 16; j += 4) {
                        if (cellAllocated[j] === 0) {
                            continue;
                        }
                        await handleAuxiliary ('move-2-top', j, j - moveCounter * 4);
                    }
                } 
                internal ();
        }

            else if (moveCounter === 3) {
                async function internal () {
                    await handleAuxiliary ('move-3-top', i, i - moveCounter * 4);
                    for (let j = i + 4; j < 16; j += 4) {
                        if (cellAllocated[j] === 0) {
                            continue;
                        }
                        await handleAuxiliary ('move-3-top', j, j - moveCounter * 4);
                    }
                } 
                internal ();
            }      
        }
    }
    handlePostMove (buttonTop);
}

function handleBottom () {
    for (let i = 0 ; i < 16; i++) {
        if (cellAllocated[i] === 1) {
            // last condition is: the two cells are on the same row
            if (cellAllocated[i + 4] === 1 && cells[i + 4 * 1].innerHTML === cells[i].innerHTML && parseInt (i % 4) === parseInt ((i + 4 * 1) % 4)) {
                handleAuxiliaryMerge ('move-1-bottom', i, i + 4 * 1);
            }
            if (cellAllocated[i + 4 * 2] === 1 && cellAllocated[i + 4] === 0 && cells[i + 4 * 2].innerHTML === cells[i].innerHTML && parseInt (i % 4) === parseInt ((i + 4 * 2) % 4)) {
                handleAuxiliaryMerge ('move-2-bottom', i, i + 4 * 2);
            }
        
            if (cellAllocated[i + 4 * 3] === 1 && cellAllocated[i + 4] === 0 && cellAllocated[i + 2 * 4] === 0 && cells[i + 4 * 3].innerHTML === cells[i].innerHTML && parseInt (i % 4) === parseInt ((i + 4 * 3) % 4)) {
                handleAuxiliaryMerge ('move-3-bottom', i, i + 4 * 3);
            }
        }
    }

    for (let i = 0 ; i < 16; i++) {
        if (cellAllocated[i] === 1) {
            let moveCounter = 0;
            let colIndex = Math.floor (i / 4);
            let currentIndex = i;
            while (colIndex < 3 && cellAllocated[currentIndex + 4] === 0) { // add a redundant element in cellAllocated array
                currentIndex += 4;
                colIndex += 1;
                moveCounter++;
            }
            // make sure that the next cell is on the current row
            if (moveCounter === 1) {
                async function internal () {
                    await handleAuxiliary ('move-1-bottom', i, i + moveCounter * 4);
                    for (let j = i - 4; j >= 0; j -= 4) {
                        if (cellAllocated[j] === 0) {
                            continue;
                        }
                        await handleAuxiliary ('move-1-bottom', j, j + moveCounter * 4);
                    }
                } 
                internal ();
            }
            
            else if (moveCounter === 2) {
                async function internal () {
                    await handleAuxiliary ('move-2-bottom', i, i + moveCounter * 4);
                    for (let j = i - 4; j >= 0; j -= 4) {
                        if (cellAllocated[j] === 0) {
                            continue;
                        }
                        await handleAuxiliary ('move-2-bottom', j, j + moveCounter * 4);
                    }
                } 
                internal ();
        }

            else if (moveCounter === 3) {
                async function internal () {
                    await handleAuxiliary ('move-3-bottom', i, i + moveCounter * 4);
                    for (let j = i - 4; j >= 0; j -= 4) {
                        if (cellAllocated[j] === 0) {
                            continue;
                        }
                        await handleAuxiliary ('move-3-bottom', j, j + moveCounter * 4);
                    }
                } 
                internal ();
            }      
        }
    }
    handlePostMove (buttonBottom);
}

function buttonsListen () {
    buttonRight.addEventListener ('click', handleRight);
    document.addEventListener ('keydown', function (e) {
        if (e.code === 'ArrowRight')
            buttonRight.click ();
    });
    
    buttonLeft.addEventListener ('click', handleLeft);
    document.addEventListener ('keydown', function (e) {
        if (e.code === 'ArrowLeft')
            buttonLeft.click ();
    });
    
    buttonTop.addEventListener ('click', handleTop);
    document.addEventListener ('keydown', function (e) {
        if (e.code === 'ArrowUp')
            buttonTop.click ();
    });
    
    buttonBottom.addEventListener ('click', handleBottom);
    document.addEventListener ('keydown', function (e) {
        if (e.code === 'ArrowDown')
            buttonBottom.click ();
    });
}


function main () {
    resetGame ();
    document.querySelector ('.reset').addEventListener ('click', resetGame);
    buttonsListen ();    
}

main ();

