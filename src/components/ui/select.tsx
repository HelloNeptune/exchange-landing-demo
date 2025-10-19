import { FC } from "react";
import clsx from "clsx";

import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react";
import {
  Root,
  Trigger,
  Value,
  Icon,
  Portal,
  Content,
  ScrollUpButton,
  ScrollDownButton,
  Viewport,
  Item,
  ItemIndicator,
  ItemText
} from "@radix-ui/react-select";
import styles from "./select.module.scss";

export interface SelectOption {
  value: string;
  label: string;
  icon?: string;
  flag?: string;
  disabled?: boolean;
}

interface Props {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  items: SelectOption[];
  className?: string;
  id?: string;
  disabled?: boolean;
}

export const Select: FC<Props> = ({ value, onValueChange, items, className, id, disabled = false, }) => {
  return (
    <Root data-slot="select" value={value} onValueChange={onValueChange} disabled={disabled}>
      <Trigger
        id={id}
        data-slot="select-trigger"
        data-size="default"
        className={clsx(styles['select-trigger'], className)}
      >
        <Value data-slot="select-value" className={styles['select-value']} />
        <Icon asChild>
          <ChevronDownIcon className={styles['select-icon']} />
        </Icon>
      </Trigger>

      <Portal>
        <Content
          data-slot="select-content"
          className={styles['select-content']}
          position="popper"
        >
          <ScrollUpButton
            data-slot="select-scroll-up-button"
            className={styles['select-scroll-button']}
          >
            <ChevronUpIcon className={styles['scroll-icon']} />
          </ScrollUpButton>
          <Viewport
            className={styles['select-viewport']}
          >
            {items.map((item) => (
              <Item
                key={item.value}
                value={item.value}
                data-slot="select-item"
                disabled={item.disabled}
                className={styles['select-item']}
              >
                <span className={styles['item-indicator']}>
                  <ItemIndicator>
                    <CheckIcon className={styles['check-icon']} />
                  </ItemIndicator>
                </span>
                <ItemText>
                  <span className="currency-option">
                    {item.icon && (
                      <img src={item.icon} className="currency-list-icon" alt={item.label} />
                    )}
                    {item.flag && !item.icon && (
                      <span className="currency-flag">{item.flag}</span>
                    )}
                    <span>{item.label}</span>
                  </span>
                </ItemText>
              </Item>
            ))}
          </Viewport>

          <ScrollDownButton
            data-slot="select-scroll-down-button"
            className={styles['select-scroll-button']}
          >
            <ChevronDownIcon className={styles['scroll-icon']} />
          </ScrollDownButton>

        </Content>
      </Portal>

    </Root >
  );
}
