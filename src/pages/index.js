import './index.less';
import './common/common';
import { a } from '../utils/api.js';
import _ from 'lodash';

function* foo(x) {
    yield x + 1;
    yield x + 2;
    return x + 3;
}
a();