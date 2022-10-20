import styled from 'styled-components'

interface Props {
    buttonColor: string;
}
export const TrafficLightButton = styled.div<Props>`
    background-color: ${(props) => props.buttonColor};
    width: 15px;
    height: 15px;
    border-radius: 50%;

    &:hover {
        filter: brightness(0.80);
    }
`
