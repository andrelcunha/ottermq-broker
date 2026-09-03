<script lang="ts">
	import { usePolledList } from '$lib/pooling.svelte';
	import { getExchanges } from '$lib/stores/exchanges.svelte';

	const exchanges = usePolledList(getExchanges);
</script>

<h1>Exchanges</h1>
<div>
	<table class="table-card">
		<thead>
			<tr>
				<th>Vhost</th>
				<th>Name</th>
				<th>Type</th>
				<th>Durable</th>
				<th>Auto Delete</th>
				<th>Internal</th>
			</tr>
		</thead>
		<tbody>
			{#each exchanges.items as e (e.vhost + e.name)}
				<tr>
					<td>{e.vhost}</td>
					<td>{e.name}</td>
					<td>{e.type}</td>
					<td>{e.durable}</td>
					<td>{e.auto_delete}</td>
					<td>{e.internal}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
