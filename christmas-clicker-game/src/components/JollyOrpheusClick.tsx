// i/am/a/file
import Image from "next/image";

type JollyOrpheusClickProps = {
	onClick: () => void;
	img: string;
};

export default function JollyOrpheusClick({ onClick, img }: JollyOrpheusClickProps) {
	return (
		<button onClick={onClick}>
			<Image src={`/cookie/${img}`} width={250} height={250} alt="Jolly Orpheus"/>
		</button>
	)
}