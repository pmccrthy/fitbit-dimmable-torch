function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Initial Torch Settings</Text>}>
        <Select
          label={"Initial brightness Level"}
          settingsKey="currentLampBrightness"
          options={[
            {name:"Level 1", value:"0"},
            {name:"Level 2", value:"1"},
            {name:"Level 3", value:"2"},
            {name:"Level 4", value:"3"},
            {name:"Level 5", value:"4"}
          ]}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);