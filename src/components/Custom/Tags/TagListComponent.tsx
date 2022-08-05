import React, { useState } from "react";
import styles from "./tag.module.scss";

interface TagProps {
  value: string[];
  lock?: string[];
  suggestion?: string[];
  onChange?: (v: string[]) => void;
  name?: string;
  small?: boolean;
  onChangeText?: (v: string) => void;
  class?: string;
  placeholder?: string;
}

export function TagListComponent(props: TagProps) {
  const [id] = useState("tag_list_" + props.name);
  const [input, setInput] = useState("");
  const [backspaceTimestamp, setBackspaceTimestamp] = useState(0);

  const lock = props.lock ? props.lock : [];
  const lockedTag = props.value.filter((tag) => lock.indexOf(tag) >= 0);
  const unlockedTag = props.value.filter((tag) => lockedTag.indexOf(tag) < 0);
  const value = [...lockedTag, ...unlockedTag];

  function complete() {
    if (input && props.onChange) {
      props.onChange([...props.value, input]);
      setInput("");
    }
  }

  function remove(index: number) {
    console.log(index);
    if (props.onChange && index >= lockedTag.length) {
      const tmp = [...value];
      tmp.splice(index, 1);
      props.onChange(tmp);
    }
  }

  return (
    <div className={styles.container}>
      <div
        className={`${styles.editor} ${
          props.class ? props.class : `form-control ${props.small && "form-control-sm"}`
        } `}
        style={props.class ? { height: 31.19 } : {}}
      >
        <ul id={props.name}>
          {value.map((tag, idx) => {
            return (
              <li
                key={tag}
                className={idx >= lockedTag.length ? "" : styles.active}
                style={{ display: "inline-flex", alignItems: "center" }}
              >
                {tag}
                {idx >= lockedTag.length && <i className="fas fa-times-circle" onClick={() => remove(idx)} />}
              </li>
            );
          })}
        </ul>
        <input
          name={props.name}
          style={{
            border: "none",
            backgroundColor: "transparent",
          }}
          onBlur={complete}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              complete();
            } else if (e.keyCode === 8 && input === "") {
              if (Date.now() - backspaceTimestamp < 300) {
                remove(value.length - 1);
              } else {
                setBackspaceTimestamp(Date.now());
              }
            }
          }}
          autoFocus={true}
          type="text"
          list={id}
          value={input}
          placeholder={props.placeholder ? props.placeholder : "Please input here"}
          onChange={(e) => {
            const changedValue = e.target.value;
            if (props.onChangeText) {
              props.onChangeText(changedValue);
            }
            if (changedValue.indexOf(",") >= 0) {
              const tokens = changedValue
                .split(",")
                .filter((token, idx, arr) => token.trim() !== "" || arr.length === idx + 1);

              if (tokens.length > 1) {
                if (props.onChange) {
                  props.onChange([...value, ...tokens.slice(0, tokens.length - 1)]);
                }
                setInput(tokens[tokens.length - 1]);
              }
            } else {
              setInput(e.target.value);
            }
          }}
        />
        <datalist id={id}>
          {(props.suggestion || []).map((tag) => (
            <option key={tag} value={tag} />
          ))}
        </datalist>
      </div>
    </div>
  );
}
