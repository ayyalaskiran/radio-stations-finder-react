import React from 'react';
import '../App.css'
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import InfiniteScroll from 'react-infinite-scroll-component';


class RadioList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            limit: 20,
            start: 0
        };
    }

    componentDidMount() {
        const { limit, start } = this.state;
        axios
            .get(`https://www.radio-browser.info/webservice/json/stations?limit=${limit}&offset=${start}`)
            .then(res => {
                this.setState({
                    isLoaded: true,
                    items: res.data,
                });
            })
    }

    fetchItems = () => {
        this.setState({ start: this.state.limit + this.state.start });
        const { limit, start } = this.state;
        axios
            .get(`https://www.radio-browser.info/webservice/json/stations?limit=${limit}&offset=${start}`)
            .then(res =>
                this.setState({ items: this.state.items.concat(res.data) })
            );
    };

    render() {
        const { isLoaded, items } = this.state;
        return (
            <div className='items' >
                <h2>Complete List of All Radio Stations</h2>
                <p>Scroll down to view more!</p>
                {!isLoaded ?
                    <CircularProgress style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)'
                    }} />
                    :
                    <InfiniteScroll
                        dataLength={this.state.items.length}
                        next={this.fetchItems}
                        hasMore={true}
                        loader={<LinearProgress />}
                    >
                        <Paper>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>id</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">Codec</TableCell>
                                        <TableCell align="right">Bit rate</TableCell>
                                        <TableCell align="right">Language</TableCell>
                                        <TableCell align="right">Country</TableCell>
                                        <TableCell align="right">Votes</TableCell>
                                        <TableCell align="right">NegativeVotes</TableCell>
                                        <TableCell align="right">URL</TableCell>
                                        <TableCell align="right">ClickCount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items.map(item => (
                                        <TableRow key={Math.random()}>
                                            <TableCell component="th" scope="row">
                                                {item.id}
                                            </TableCell>
                                            <TableCell >{item.name}</TableCell>
                                            <TableCell align="right">{item.codec}</TableCell>
                                            <TableCell align="right">{item.bitrate}</TableCell>
                                            <TableCell align="right">{item.language}</TableCell>
                                            <TableCell align="right">{item.country}</TableCell>
                                            <TableCell align="right">{item.votes}</TableCell>
                                            <TableCell align="center">{item.negativevotes}</TableCell>
                                            <TableCell align="right"><a href={item.url} target='_blank' rel="noopener noreferrer">Listen</a></TableCell>
                                            <TableCell align="center">{item.clickcount}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </InfiniteScroll>
                }

            </div>
        );
    }

}

export default RadioList;

