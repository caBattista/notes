---
created: 1970-01-01T01:00
updated: 2026-01-30T11:55
---
# 🧩 Components

A component is a function that returns UI. Everything else builds on this.

```tsx
export function Button() {
  return <button>Click</button>;
}
```
#### Why it matters:
- Your UI is a tree of components
- Components can be reused and nested
- They re-render when their _data changes_

# 🎁 Props (Inputs to a Component)

Props let you configure a component.

```tsx
export function Button({ label }) {
  return <button>{label}</button>;
}

// Result
<Button label="Save" />
```
#### Why it matters:
- Components become reusable and dynamic
- Parent → child data flow

# 💾 State (React’s “Memory”)

State is how a component remembers things over time.

```tsx
const [count, setCount] = useState(0);
```
#### Why it matters:
- Components become reusable and dynamic
- Parent → child data flow

# 🔄 Re-rendering (The Hidden Key)

React automatically re-renders when:
✔ state changes  
✔ props change  
✔ a parent component re-renders

⚠️ Understanding _when_ React re-renders is a core mental model.
#### Why it matters:
 + Re-rendering is how React updates the UI—it's the engine.

# 🪝 Hooks

Hooks are functions that let components use features like state, effects, refs, etc.

```tsx
import React, {
  useState,         // Manages local, reactive component state
  useEffect,        // Runs side effects after render (fetching, timers, sync)
  useContext,       // Reads data from a React Context provider
  useReducer,       // State logic reducer for structured/complex updates
  useRef,           // Stores mutable values & DOM references without rerendering
  useCallback,      // Memoizes a callback to avoid function recreation
  useMemo,          // Memoizes computed values for performance
  useLayoutEffect,  // Like useEffect but runs synchronously before browser paint
  useImperativeHandle, // Customizes what is exposed through a ref to a parent
  forwardRef,
  createContext,
} from "react";

// Stores state that triggers rerender on change. Perfect for UI-driven values.
export function UseStateExample() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>;
}

// Handles side effects: data fetching, subscriptions, event listeners.
export function UseEffectExample() {
  useEffect(() => {
    console.log("mounted"); // Runs on mount
    return () => console.log("unmounted"); // Cleanup
  }, []);
  return <div/>;
}

// Allows consuming values provided by a Context provider higher in the tree.
const UserContext = createContext<string | null>(null);
export function UseContextExample() {
  const user = useContext(UserContext);
  return <div>User: {user}</div>;
}

// Better than useState for multi-step or branching state updates.
type Action = { type: "inc" } | { type: "dec" };
function reducer(s: {count:number}, a: Action) {
  return { count: a.type === "inc" ? s.count + 1 : s.count - 1 };
}
export function UseReducerExample() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return <button onClick={() => dispatch({ type: "inc" })}>{state.count}</button>;
}

// Persists a mutable value across renders; commonly used to refer to DOM nodes.
export function UseRefExample() {
  const inputRef = useRef<HTMLInputElement>(null);
  return <input ref={inputRef}/>;
}

// Returns a memoized function to avoid unnecessary rerenders in children.
export function UseCallbackExample() {
  const double = useCallback((n: number) => n * 2, []);
  return <div>{double(2)}</div>;
}

// Stores a computed value that only recalculates when dependencies change.
export function UseMemoExample() {
  const value = useMemo(() => 10 * 2, []);
  return <div>{value}</div>;
}

// Runs synchronously *before* the browser paints; used for layout reads/adjustments.
export function UseLayoutEffectExample() {
  useLayoutEffect(() => { /* measure DOM or sync visual state */ });
  return <div/>;
}

// Lets parents call imperative methods on your component via ref.
export const ImperativeHandleExample = forwardRef<HTMLInputElement>((_, ref) => {
  const innerRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => ({ focus: () => innerRef.current?.focus() }));
  return <input ref={innerRef}/>;
});

// Generates a stable, unique ID—ideal for accessibility + server rendering.
export function UseIdExample() {
  const id = React.useId();
  return <><label htmlFor={id}>Name</label><input id={id}/></>;
}

// Marks an update as low priority to keep UI responsive during heavy updates.
export function UseTransitionExample() {
  const [isPending, start] = React.useTransition();
  const [text, setText] = useState("");
  return (
    <>
      <input onChange={e => start(() => setText(e.target.value))}/>
      {isPending ? "Updating..." : text}
    </>
  );
}

// Creates a "lagged" version of a value for smoother UI during fast updates.
export function UseDeferredValueExample() {
  const [v, setV] = useState("");
  const deferred = React.useDeferredValue(v);
  return <input value={v} onChange={e => setV(e.target.value)} />;
}
```

# ⬇️➡️ One-Way Data Flow (React’s Philosophy)

React flows data **downward** (top → bottom).

You never “push” data upward.  
You give children:
- props for data
- callbacks to notify the parent

This creates predictable, easy-to-debug UI.

# 🧠 The 4 Things You Should Practice to Learn React Quickly

1. **Build small components**
    - Counter
    - Toggle button
    - Input field that displays text
2. **Lift state up**
    - Parent component stores the data
    - Child only receives props
3. **Use `useEffect` correctly**
    - Fetch data
    - Add event listeners
    - Debounce effects    
4. **Think in React Tree**
    - UI broken into small reusable parts
    - Parent/child relationships
# 1️⃣ React Context (Context API)

## What problem it solves

**Prop drilling**.

Instead of passing props like:

`App → Page → Sidebar → Button`

you can put shared data in **context** and read it anywhere in the tree.

Context is built into React and is best for:

- Theme (dark/light)
- Auth user
- Locale / language
- Feature flags
- Small–medium global state
---
## Core idea

Context lets you:

1. **Create** a context
2. **Provide** a value
3. **Consume** the value anywhere below

---
## Example: Theme Context

### 1️⃣ Create the context

```jsx 
import { createContext } from "react";  export const ThemeContext = createContext("light");
```
### 2️⃣ Provide the context

```jsx
import { ThemeContext } from "./ThemeContext";  function App() {   
return (     
	<ThemeContext.Provider value="dark">       
		<Page />    
	</ThemeContext.Provider>   
	); }
```
### 3️⃣ Consume the context

```jsx 
import { useContext } from "react"; 
import { ThemeContext } from "./ThemeContext";  
function Button() {   
	const theme = useContext(ThemeContext);    
	return (     
		<button className={theme === "dark" ? "dark-btn" : "light-btn"}>
			Click me     
		</button>   
		); }
```
## Context with state (very common)

```jsx
function ThemeProvider({ children }) {   
const [theme, setTheme] = useState("light");    
return (
	<ThemeContext.Provider value={{ theme, setTheme }}>       
		{children}     
	</ThemeContext.Provider>   
	); }
```

Usage:

`const { theme, setTheme } = useContext(ThemeContext);`

---
## ⚠️ Context limitations

- **Every consumer re-renders** when the value changes
- Not great for:
    - Very frequent updates
    - Large, complex state
    - Debugging time-travel or undo

👉 This is where Redux often comes in.

---
# 2️⃣ Redux

## What problem it solves

**Predictable, centralized state management at scale**

Redux is ideal when:
- State is complex
- Many unrelated components need it
- You want clear state flow & debugging
- You need caching, syncing, persistence, or devtools

Think:
- Shopping cart
- Auth session
- Notifications
- Server data cache
- Multi-step workflows

---
## Core Redux ideas (classic mental model)

1. **Store** – the single source of truth
2. **Actions** – plain objects describing what happened
3. **Reducers** – pure functions that update state
4. **Dispatch** – sends actions to reducers

> “Actions describe _what happened_, reducers decide _how state changes_.”

---
## Redux Toolkit (modern Redux)

You almost **never write classic Redux anymore**. Redux Toolkit (RTK) is the standard.

---
## Example: Counter with Redux Toolkit

### 1️⃣ Create a slice

```jsx 
import { createSlice } from "@reduxjs/toolkit";  
const counterSlice = 
	createSlice({   
		name: "counter",   
		initialState: { value: 0 },   
		reducers: {     increment: (state) => {       
			state.value += 1;     
		},     
		decrement: (state) => {       
			state.value -= 1;     
		},   
	}, });  
export const { increment, decrement } = counterSlice.actions; 
export default counterSlice.reducer;
```
### 2️⃣ Create the store

```js 
import { configureStore } from "@reduxjs/toolkit"; 
import counterReducer from "./counterSlice";  
export const store = configureStore({   
	reducer: {     
		counter: counterReducer,   
		}, 
	});
```
### 3️⃣ Provide the store

```jsx
	import { Provider } from "react-redux"; import { store } from "./store";  function App() {   
	return (     
	<Provider store={store}>       
		<Counter />     
	</Provider>   ); 
	}
```
### 4️⃣ Use Redux in components

```jsx
	import { useSelector, useDispatch } from "react-redux"; 
	import { increment, decrement } from "./counterSlice";  
	function Counter() {   
		const count = useSelector((state) => state.counter.value);   
		const dispatch = useDispatch();    
		return (<>       
			<p>{count}</p>       
			<button onClick={() => dispatch(increment())}>+</button>       
			<button onClick={() => dispatch(decrement())}>-</button>     
			</>   
		); 
	}
```

---
## Why Redux scales better than Context

- Components only re-render when selected state changes
- Middleware (logging, async, persistence)
- Excellent devtools (time travel, inspect actions)
- Clear separation of concerns
- Easier to test

---
# 3️⃣ Context vs Redux (when to use what)

### ✅ Use Context when:

- State is small & simple
- Updates are infrequent
- App is small or medium
- Example: theme, auth user, language

### ✅ Use Redux when:

- State is large or shared widely
- Many updates per second
- You need async logic & caching
- You want debuggability and structure

---
## 🧠 Important truth

Redux **uses Context internally**.

So the real choice is:

> **Simple global state → Context**  
> **Complex global state → Redux**

---
# 4️⃣ Common real-world combo

Many apps do this:

- Context → theme, auth, feature flags
- Redux → app/business data

Totally normal. Very common in production.