import { useCallback, useState, useEffect } from "react";
import initialData from "./data.json";

export const useSaveCallback = (editor, dataKey) => {
  return useCallback(async () => {
    if (!editor) return;
    try {
      const out = await editor.save();
      console.group("EDITOR onSave");
      console.dir(out);
      localStorage.setItem(dataKey, JSON.stringify(out));
      console.info("Saved in localStorage");
      console.groupEnd();
    } catch (e) {
      console.error("SAVE RESULT failed", e);
    }
  }, [editor]);
};

// Set editor data after initializing
export const useSetData = (editor, data) => {
  useEffect(() => {    
    if (!editor || !data) {
      return;
    }

    editor.isReady.then(() => {
      // fixing an annoying warning in Chrome `addRange(): The given range isn't in document.`
      setTimeout(() => {
        if (data.blocks.length > 0) {
          if (!editor.render) {
            return;
          }

          editor.render(data);
        } else {
          if(!data){
            editor.clear();
          }
        }
      }, 100);
    });
  }, [editor, data]);
};

export const useClearDataCallback = (editor) => {
  return useCallback(
    (ev) => {
      ev.preventDefault();
      if (!editor) {
        return;
      }
      editor.isReady.then(() => {
        // fixing an annoying warning in Chrome `addRange(): The given range isn't in document.`
        setTimeout(() => {
          editor.clear();
        }, 100);
      });
    },
    [editor]
  );
};

// load saved data
export const useLoadData = (dataKey) => {
  const [item, setItem] = useState(null);
  const [load, setLoad] = useState(false);

  // Mimic async data load
  useEffect(() => {
    setLoad(true);
    const id = setTimeout(() => {
      console.group("EDITOR load data");
      const saved = localStorage.getItem(dataKey);

      if (saved) {
        const parsed = JSON.parse(saved);
        setItem(parsed);
        console.dir(parsed);
      } else {
        console.info("No saved data, using initial");
        console.dir(initialData);
        setItem(initialData);
      }
      console.groupEnd();
      setLoad(false);
    }, 200);

    return () => {
      setLoad(false);
      clearTimeout(id);
    };
  }, []);

  return { item, load };
};
