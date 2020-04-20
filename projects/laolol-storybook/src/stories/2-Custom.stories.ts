import { LaololComponentsComponent } from 'laolol-components';

export default {
  title: 'Custom test',
  component: LaololComponentsComponent,
};

export const CustomTest = () => ({
  component: LaololComponentsComponent,
  props: {},
});

CustomTest.story = {
  name: 'Custom test',
};
