import 'babel-polyfill';
import './index.less';
import { a } from '../utils/api.js';

function* foo(x) {
    yield x + 1;
    yield x + 2;
    return x + 3;
}
a()