import { Tabs, Tab as WebTab, TabPanel, TabList } from 'react-web-tabs';

const Tab = ({ id, tab }) => <WebTab tabFor={id}>{tab}</WebTab>;
const Panel = ({ id, panel }) => <TabPanel tabId={id}>{panel}</TabPanel>;

const VerticalTabs = ({ tabs }) => (
  <Tabs defaultTab={tabs[0].id} vertical>
    <TabList>
      {tabs.map(tab => (
        <Tab key={tab.id} {...tab} />
      ))}
    </TabList>
    {tabs.map(tab => (
      <Panel key={tab.id} {...tab} />
    ))}
  </Tabs>
);

export default VerticalTabs;
