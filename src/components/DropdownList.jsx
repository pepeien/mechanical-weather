import { useState } from 'react';
import {
    useDispatch,
    useSelector
} from 'react-redux';

//Icons
import {
    arrowIcon
} from '../assets/images/icons';

//Services
import {
    fade,
    unfade
} from '../services';

const DropdownList = (props) => {
    const dispatch = useDispatch(),
          selectedPortInfo = useSelector(state => state.portInfo);

    const [selectedOption, setSelectedOption] = useState(selectedPortInfo.path ? selectedPortInfo.path : 'Selecione uma porta'),
          [isListActive, setIsListActive] = useState(false),
          { options } = props;

    const showOptionList = () => {
        const dropdownElement = document.getElementsByClassName('dropdown')[0];

        dropdownElement.classList.add('--active');

        return unfade(document.getElementById('dropdown-options'), 15);
    };

    const hideOptionList = () => {
        const dropdownElement = document.getElementsByClassName('dropdown')[0];

        dropdownElement.classList.remove('--active');

        return fade(document.getElementById('dropdown-options'), 15);
    };

    const displayOptionListHandler = async () => {
        if(isListActive){
            await hideOptionList()
            .then(setIsListActive(!isListActive))
        }else{
            await showOptionList()
            .then(setIsListActive(!isListActive))
        };
    };

    const updatedSelectedOption = (option) => {
        hideOptionList();

        if(option !== selectedOption){
            dispatch(props.action(option));
            setSelectedOption(option);
        };

        setIsListActive(false);
    };

    return(
        <div className="dropdown --flex --column">
            <div
                className="dropdown__header --flex --row --centralize --smooth-transition"
                onClick = {displayOptionListHandler}
            >
                <span className="dropdown__selected">{selectedOption}</span>
                {arrowIcon}
            </div>
            <ul
                id="dropdown-options"
                className="dropdown__options --flex --column --centralize-horiz"
            >
                {options.map((option, i) => {
                    return(
                        <li
                            className={option === selectedOption ? 'dropdown__option --flex --centralize --smooth-transition --active' :
                            'dropdown__option --flex --centralize --smooth-transition'}
                            key={i}
                            onClick={() => updatedSelectedOption(option)}
                        >
                            <span>{option}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default DropdownList;