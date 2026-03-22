import { Button, ModalCard, ModalRoot, Text } from "@vkontakte/vkui";

import type { Movie } from "@/entities/movie/model";

type FavoriteConfirmModalProps = {
	pendingMovie: Movie | null;
	onConfirm: () => void;
	onCancel: () => void;
};

export const FavoriteConfirmModal = ({
	pendingMovie,
	onConfirm,
	onCancel,
}: FavoriteConfirmModalProps): React.JSX.Element => {
	return (
		<ModalRoot
			activeModal={pendingMovie ? "favorite-confirm" : null}
			onClose={onCancel}
		>
			<ModalCard
				id="favorite-confirm"
				header="Добавить в избранное?"
				subheader={pendingMovie?.title || ""}
				actions={
					<div style={{ display: "flex", gap: 8 }}>
						<Button mode="secondary" onClick={onCancel}>
							Отмена
						</Button>
						<Button mode="primary" onClick={onConfirm}>
							Подтвердить
						</Button>
					</div>
				}
				onClose={onCancel}
			>
				<Text>Фильм будет добавлен только после подтверждения.</Text>
			</ModalCard>
		</ModalRoot>
	);
};
