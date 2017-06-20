// eslint-disable-next-line
import htmlSerializer from 'jest-serializer-html';
import componentFixtureSerializer from './test/jest/componentFixtureSerializer';

// add snapshot serializers
expect.addSnapshotSerializer(componentFixtureSerializer);
expect.addSnapshotSerializer(htmlSerializer);
