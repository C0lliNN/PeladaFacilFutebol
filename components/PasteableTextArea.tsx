import { TextArea } from "native-base";

type Props = {
  text: string;
  setText: (text: string) => void;
  onPaste(text: string): void;
};

export default function PasteableTextArea(props: Props) {
  function handleTextChange(text: string) {
    props.setText(text);
    props.onPaste(text);
  }

  return (
    <TextArea
      placeholder="Cole a lista aqui"
      showSoftInputOnFocus={false}
      autoCompleteType={"off"}
      size="lg"
      value={props.text}
      onChangeText={handleTextChange}
      h="72"
    />
  );
}
