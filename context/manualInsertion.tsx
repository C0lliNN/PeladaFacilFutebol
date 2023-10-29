import { createContext, useState } from "react";

export const ManualInsertionContext = createContext<{
  manualInsertion: boolean;
  toggleManualInsertion: () => void;
}>({
  manualInsertion: false,
  toggleManualInsertion: () => {},
});

type Props = {
  children: JSX.Element;
};

export default function ManualInsertionProvider({
  children,
}: Props): JSX.Element {
  const [manualInsertion, setManualInsertion] = useState(false);

  function toggleManualInsertion() {
    setManualInsertion(!manualInsertion);
  }

  return (
    <ManualInsertionContext.Provider
      value={{ manualInsertion, toggleManualInsertion }}
    >
      {children}
    </ManualInsertionContext.Provider>
  );
}
