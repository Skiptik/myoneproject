import { Button } from "react-bootstrap";
import styles from './ButtonCustom.module.scss'

const CustomButton = ({ children, className, role="",...rest }) => {
    return (
      <Button
        className={`${styles.btn_active} ${className || ''}`} // Объединяем стили
        {...rest} // Прокидываем все остальные пропсы (type, onClick и т.д.)
      >
        {children}
      </Button>
    );
  };


export default CustomButton;