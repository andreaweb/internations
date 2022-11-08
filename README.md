`yarn`
`yarn start`

Current functionalities:
- 3 unremovable users and groups are loaded by default
- You can add new groups
- You can create new users. Users must have name, group, and image (image currently not validated)
- You can delete users you created

Missing:
- Delete groups
- Add users to multiple groups. There are many ways to do that. A possibility is https://www.npmjs.com/package/react-multi-select-component
- tests
- some UI improvements e.g. hide NewGroup when is already displayed and NewUser is toggled, and vice versa