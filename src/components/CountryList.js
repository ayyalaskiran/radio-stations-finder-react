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


class CountryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            limit: 40,
            start: 0,
            total: 0
        };
    }

    componentDidMount() {
        const { limit, start } = this.state;
        axios
            .get(`https://www.radio-browser.info/webservice/json/stations/bycountry/india?limit=${limit}&offset=${start}`)
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
            .get(`https://www.radio-browser.info/webservice/json/stations/bycountry/india?limit=${limit}&offset=${start}`)
            .then(res =>
                this.setState({ items: this.state.items.concat(res.data), total: this.state.items.length })
            );
    };

    render() {
        const { isLoaded, items } = this.state;
        return (
            <div className='items'>
                <h2 >List of Indian Radio Stations</h2>
                <p>Scroll down to view more!</p>
                {!isLoaded ? <CircularProgress style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                }} /> : <InfiniteScroll
                    dataLength={this.state.items.length}
                    next={this.fetchItems}
                    hasMore={this.state.total !== this.state.items.length ? true : false}
                    useWindow={false}
                    loader={<LinearProgress />}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>}
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
                                        <TableCell align="center">Favicon</TableCell>
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
                                            <TableCell align="center">
                                                <img src={item.favicon} alt='source' onError={i => i.target.src = 'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png'} width='100' height='100' /></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </InfiniteScroll>}

            </div>
        );
    }
}

export default CountryList;