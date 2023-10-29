import {TextArea} from "native-base";

type Props = {
    text: string
    setText: (text: string) => void;
}

export default function PasteableTextArea(props: Props) {
    function handleTextChange(text: string) {
        props.setText(text);
    }

    return (
      <TextArea
        placeholder="Cole a lista aqui"
        autoCompleteType=""
        size="lg"
        value={props.text}
        onChangeText={handleTextChange}
        h="48"
      />
    );     
}
