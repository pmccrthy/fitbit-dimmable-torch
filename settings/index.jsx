function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Default Torch Settings</Text>}>
        <Toggle
          settingsKey="maxBrightnessOn"
          label="Enable Max Brightness"
        />
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