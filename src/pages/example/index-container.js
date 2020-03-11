import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Index from './index.js';
import * as actionExample from '../../models/action-creators/action-example.js';

function mapStateToProps(state) {
  return {
    amount: state._example.amount,
    cityNames: state._example.cityNames,
    loading: state._example.loading,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addAmount: actionExample.addAmount,
    reduceAmount: actionExample.reduceAmount,
    getAuthToken: actionExample.getAuthToken,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);