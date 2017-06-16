import componentFixtureSerializer from './test/jest/componentFixtureSerializer';

// add snapshot serializers
expect.addSnapshotSerializer(componentFixtureSerializer);
