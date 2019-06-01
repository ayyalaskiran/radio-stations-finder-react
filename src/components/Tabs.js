import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import RadioList from '../components/RadioList';
import CountryList from './CountryList';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

function TabsWrappedLabel() {
    const classes = useStyles();
    const [value, setValue] = React.useState('one');

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab value="one" label="All Radio Stations" />
                    <Tab value="two" label="Indian Radio Stations" />
                </Tabs>
            </AppBar>
            {value === 'one' && <TabContainer><RadioList /></TabContainer>}
            {value === 'two' && <TabContainer><CountryList /></TabContainer>}
        </div>
    );
}

export default TabsWrappedLabel;