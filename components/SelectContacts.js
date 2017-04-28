import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, FlatList} from 'react-native';

import {connect} from 'react-redux';

import {updateContacts} from '../actions/actions.contacts';

import * as Contacts from 'react-native-contacts';
import Row from './Row';

class SelectContacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };   
    }
    componentDidMount() {
        Contacts.getAll((err, contacts) => {       
            if (err && err.type === 'permissionDenied') {
                this.setState({
                    data: contacts,
                });
            } else {
                this.setState({
                    data: contacts,
                });
            }
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList 
                style={styles.flatList}
                data={this.state.data} 
                keyExtractor={(item, i) => i} 
                renderItem={(item) => 
                    <Row addNumber={this.props.updateContacts} {...item.item} />
                }/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignSelf: 'stretch',
        paddingBottom: 80,
        paddingTop: 20,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatList: {
        flex:1,
        alignSelf: 'stretch',
        marginTop: 20
    },
});

Contacts.propTypes = {
    contacts: PropTypes.array,
    updateContacts: PropTypes.func
};


function mapStateToProps(state) {
    return {
        contacts: state.contacts,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        updateContacts: (contactList) => {
            dispatch(updateContacts(contactList));
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(SelectContacts);
