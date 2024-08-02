import {Form, Input} from "rsuite";

const InputField = ({error, ...rest}) => {
    return (
        <Form.Group>
            <Input {...rest} />
            <Form.ErrorMessage show={!!error} placement="bottomStart">
                {error}
            </Form.ErrorMessage>
        </Form.Group>
    );
};

export default InputField;