import { connect } from 'react-redux';
import Index from './index.js';
import { actions as counterActions } from '@models/counter';

function mapStateToProps(state) {
    return {
        count: state.counter.count,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        increase: (e) => dispatch(counterActions.increase(e)),
        decrease: (e) => dispatch(counterActions.decrease(e)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index);
