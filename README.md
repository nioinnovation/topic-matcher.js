# Installation

```bash
$ npm install @nio/topic-matcher
```

# Usage

```js
import match from '@nio/topic-matcher';

// match: (subTopic: string, pubTopic: string) => boolean;

match('foo', 'foo'); // => true
match('foo', 'bar'); // => false
match('foo.*', 'foo.bar'); // => true
match('foo.**', 'foo.bar.baz'); // => true
````
