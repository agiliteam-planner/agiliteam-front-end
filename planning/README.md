# AgiliTeam-Project-Planner.planning;

## React App Structure

```
─ App.js
    ├── About.js
    ├── TaskDetails.js
    ├── Login.js
    ├── Settings.js
    │   └── Users.js
    │           └── User.js
    └── Stages.js
        └── Stage.js
            └── TaskCard.js
```

### UI WireFrames

Main View
![image](https://user-images.githubusercontent.com/24361930/151812147-a7cde2be-9257-43ce-a73c-a8eb6a613f44.png)

Task View
![image](https://user-images.githubusercontent.com/24361930/151812506-b0faae0e-623c-4e67-97a1-fc5e1a5be62b.png)

About View
![image](https://user-images.githubusercontent.com/24361930/151812592-98feb216-642c-4db5-8d30-ab8c5b35de63.png)

### App Styling

The app uses a consolidated set of CSS variables and classes to achieve a cohesive design. When viewed in a narrow screen, the responsive design provides overrides for the same variables for a uniformly-scaled design.

```css
:root {
	/* Fonts */
	--heading-font: 'Secular One', sans-serif;
	--body-font: 'Oxygen', sans-serif;

	/* Colors */
	--header-background-color: darkslategray;
	--header-font-color: whitesmoke;
	--panel-background-color: whitesmoke;
	--accent-color: #383e56;
	--accent-background-color: #7a8e8e;
	--card-background-color: white;

	/* Spacing */
	--app-left-right-margin: 2rem;
	--nav-top-bottom-margin: 1.75rem;
	--main-vertical-spacing: 1.5rem;
	--main-children-spacing: 0.5rem;
	--material-padding: var(--main-children-spacing);
	--inline-element-spacing: 0.75rem;
	--element-label-gap: 0.25rem;

	/* Decorations */
	--typical-radius: 0.3rem;
}

/* Overrides for mobile screens */
@media only screen and (max-width: 640px) {
	:root {
		/* Spacing */
		--app-left-right-margin: 1.5rem;
		--nav-top-bottom-margin: 1.25rem;
		--main-vertical-spacing: 0.75rem;
		--main-children-spacing: 0.35rem;
		--material-padding: var(--main-children-spacing);
		--inline-element-spacing: 0.5rem;
		--element-label-gap: 0.25rem;
	}
	html {
		font-size: 90%;
	}
}
```

## API Data Models

#### Task

- Title (String)
- Description (String)
- Stage (String)
- Duedate (Date)
- Priority (Number)
- Owner (String)
- Checklist [String]
  + { title: String, checked: boolean }
- Comments [String]
  + {user: String, content: String, time: Date}
- Files [String]

#### Settings:

- Users [{
  + username: (String),
  + firstName: (String),
  + lastName: (String),
  + image: (String)
  }]
-  Stages [String];

#### Message:

-  User (String)
-  Time (Date)
-  Content (String)

### API Request-Response Cycle

![image](https://user-images.githubusercontent.com/24361930/151812876-ea0d1349-b373-4292-b98c-c04b99199c8f.png)

## Team Collab

To organize during the development process, our team used a similar tool which also helped identify use cases.

![image](https://user-images.githubusercontent.com/24361930/151817555-b60a01cc-8e97-43cd-9b26-e5b3ccdeebd8.png)

![image](https://user-images.githubusercontent.com/24361930/151813856-5730eb55-c3ac-42a4-9a37-f71debf62a74.png)

