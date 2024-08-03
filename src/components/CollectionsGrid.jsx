import Link from 'next/link';
import g from '@/styles/globals.module.css';
import {SkeletonBeta} from '@/components/SkeletonBeta';
import {EmptySpace} from "@/components/ui/EmptySpace";

export const CollectionsGrid = ({title, collectionStore, isFetching, type}) => {

	if (isFetching || collectionStore.length === 0) {
		return <SkeletonBeta/>;
	}

	return (
		<>
			<span className={g.type}>{title}</span>
			<EmptySpace height={"24px"}/>
			<div className={g.collectionsGrid}>
				{
					collectionStore.map((item) => (
						<Link
							key={item.id}
							href={`/collections/${type.toLowerCase()}/${item.id}`}
							style={{
								backgroundImage: `url(${item.data[0].url})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
							}}
							className={g.collection}
						>
							<p className={g.collectionName}>{item.title}</p>
						</Link>
					))
				}
			</div>
			<EmptySpace height={"48px"}/>
		</>
	);
};
