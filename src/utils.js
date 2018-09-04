import { fill, random, map, toNumber, split, forEach, get } from 'lodash';

export function getFilledArray() {
    const initial = fill(Array(10), fill(Array(10)));

    const filled = map(initial, (row, outer)=>
        map(row, (_, inner) =>
            ({
                type: random(1, 4),
                id  : `${outer}:${inner}`
            })
        )
    );

    return filled;
}

function checkCross(array, id, type) {
    const [outer, inner] = map(split(id, ':'), toNumber);
    let top = get(array, [outer + 1, inner])
    let bottom = get(array, [outer -1, inner])
    let left = get(array, [outer, inner - 1])
    let right = get(array, [outer, inner + 1])

    forEach([top, right, bottom, left], side => {
        if (side && side.type === type) {
            removeCell(array, side.id, side.type)
        }
    })
}

function checkCorners(array, id, type) {
    const [outer, inner] = map(split(id, ':'), toNumber);
    let top = get(array, [outer + 1, inner + 1])
    let bottom = get(array, [outer -1, inner - 1])
    let left = get(array, [outer + 1, inner - 1])
    let right = get(array, [outer - 1, inner + 1])

    forEach([top, right, bottom, left], side => {
        if (side && side.type === type) {
            removeCell(array, side.id, side.type)
        }
    })
}

export function removeCell(array, id, type) {
    if (!array || !id || !type) return;

    const [outer, inner] = map(split(id, ':'), toNumber);

    array[outer][inner] = { type: null, id: null };
    checkCross(array, id, type);
    checkCorners(array, id, type);

    return array;
}
