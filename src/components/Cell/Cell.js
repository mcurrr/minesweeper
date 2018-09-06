import React, { PureComponent } from 'react';
import { Motion, spring } from 'react-motion';
import { toNumber, map, split } from 'lodash';

import './Cell.css';


class Cell extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
        y: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id && nextProps.y && nextProps.id !== this.props.id && nextProps.y !== this.props.y) {
        this.setState({ y: toNumber(nextProps.y) })
    }
  }

  render() {
    const { oldId, id, type } = this.props;

    if (!id) return null;

    const [top, left] = map(split(id, ':'), x => toNumber(x) * 50);
    const [oldTop, oldLeft] = oldId ? map(split(oldId, ':'), x => toNumber(x) * 50) : [0, 0];

    return oldId ? (
        <Motion
            defaultStyle={{ top: oldTop, left: oldLeft }}
            style={{ top: spring(top), left: spring(left) }}
        >
            {({ top, left }) =>
            <div
                style={{ top, left }}
                onClick={() => this.props.onChange({ id, type })}
                className={`cell a-${type} ${id ? '' : 'invisible'}`}
            >
                {type}
            </div>
            }
        </Motion>
    ) : (
        <div
            style={{ top, left }}
            onClick={() => this.props.onChange({ id, type })}
            className={`cell a-${type}`}
        >
            {type}
        </div>
    )
  }
}

export default Cell;
