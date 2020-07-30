import React from 'react';
import styles from './index.module.css';
import Origami from '../origami';

class Origamis extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            origamis: []
        }
    }

    getOrigamis = async () => {
        const response = await fetch('http://localhost:9999/api/origami');
        const result = await response.json();

        this.setState({
            origamis: result
        });
    }

    renderOrigamis() {
        const { origamis } = this.state;

        return origamis.map(origami => {
            return (
                <Origami key={origami._id} author={origami.author.username} description={origami.description} />
            )
        });
    }

    componentDidMount() {
        this.getOrigamis();
    }

    render() {
        return (<div className={styles.main}>
            <h1>Very cool origamis</h1>
            <div className={styles.origamis}>
                {this.renderOrigamis()}
            </div>
        </div>
        );
    }
}

export default Origamis;