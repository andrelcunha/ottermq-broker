<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		open: boolean;
		title?: string;
		onclose: () => void;
		children: Snippet;
	}

	let { open, title, onclose, children }: Props = $props();

	function handleKeydown(e: KeyboardEvent) {
		if (open && e.key === 'Escape') onclose();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<div class="backdrop" onclick={onclose} role="presentation">
		<!-- svelte-ignore a11y_click_events_have_key_events -- this only stops the
		     backdrop's close-on-click from firing for clicks inside the dialog;
		     it's not a user interaction of its own -->
		<div
			class="modal"
			onclick={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
			tabindex="-1"
		>
			{#if title}
				<div class="modal-head">
					<h3>{title}</h3>
					<button class="modal-close" onclick={onclose} aria-label="Close">✕</button>
				</div>
			{/if}
			<div class="modal-body">
				{@render children()}
			</div>
		</div>
	</div>
{/if}

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		background: color-mix(in srgb, black 45%, transparent);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;
	}

	.modal {
		background: var(--color-surface);
		color: var(--color-text);
		border-radius: 10px;
		border: 1px solid var(--color-border);
		width: min(420px, calc(100vw - 32px));
		max-height: calc(100vh - 64px);
		overflow-y: auto;
		box-shadow: 0 20px 50px color-mix(in srgb, black 25%, transparent);
	}

	.modal-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16px 20px;
		border-bottom: 1px solid var(--color-border);
	}
	.modal-head h3 {
		font-size: 18px;
		font-weight: 600;
		margin: 0;
	}
	.modal-close {
		background: transparent;
		border: none;
		font-size: 16px;
		line-height: 1;
		color: var(--color-text-muted);
		cursor: pointer;
		padding: 4px;
	}
	.modal-close:hover {
		color: var(--color-text);
	}

	.modal-body {
		padding: 20px;
	}
</style>
