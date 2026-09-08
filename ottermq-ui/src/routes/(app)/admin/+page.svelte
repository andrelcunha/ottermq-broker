<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import { usePolledList } from '$lib/pooling.svelte';
	import type { UserCreateRequest } from '$lib/stores/admin.svelte';
	import { addUser, getPermission, getUsers } from '$lib/stores/admin.svelte';

	const users = usePolledList(getUsers);
	const permissions = usePolledList(getPermission);

	let showAddUser = $state(false);

	const roleOptions = [
		{ label: 'Admin', value: 1 },
		{ label: 'Viewer', value: 2 }
	];

	let newUser = $state<UserCreateRequest>({
		username: '',
		password: '',
		confirm_password: '',
		role: roleOptions[0].value
	});

	let addUserError = $state('');

	const submitAddUser = async () => {
		addUserError = '';
		try {
			await addUser(newUser);
			showAddUser = false;
			newUser = {
				username: '',
				password: '',
				confirm_password: '',
				role: roleOptions[0].value
			};
		} catch (err) {
			addUserError = err instanceof Error ? err.message : 'Failed to add user';
		} finally {
			showAddUser = false;
		}
	};
</script>

<div class="users-container">
	<h2>Users</h2>
	<button onclick={() => (showAddUser = true)}>Add User </button>
	<Modal
		open={showAddUser}
		title="Add User"
		onclose={() => {
			showAddUser = false;
		}}
	>
		<div>
			{#if addUserError}
				<p class="form-error">{addUserError}</p>
			{/if}
			<label
				>Username
				<input type="text" bind:value={newUser.username} />
			</label>
			<label
				>Password
				<input type="password" bind:value={newUser.password} />
			</label>
			<label
				>Confirm Password
				<input type="password" bind:value={newUser.confirm_password} />
			</label>
			<label
				>Role
				<select name="role-dropdown" bind:value={newUser.role}>
					{#each roleOptions as r (r.value)}
						<option value={r.value}>{r.label}</option>
					{/each}
				</select>
			</label>
			<button onclick={submitAddUser}>Submit</button>
		</div>
	</Modal>
	<table class="table-card">
		<thead>
			<tr>
				<th>Username</th>
				<th>Role</th>
				<th>Action</th>
			</tr>
		</thead>
		<tbody>
			{#each users.items as u (u.id)}
				<tr>
					<td>{u.username}</td>
					<td>{u.role}</td>
					<td><span> 🔑 </span><span> 🗑️ </span></td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
<div class="users-container">
	<h2>Permissions</h2>
	<table class="table-card">
		<thead>
			<tr>
				<th>User</th>
				<th>VHost</th>
			</tr>
		</thead>
		<tbody>
			{#each permissions.items as p (p.vhost + p.username)}
				<tr>
					<td>{p.username}</td>
					<td>{p.vhost}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	h2 {
		font-size: 26px;
		font-weight: 400;
		color: var(--color-text);
	}
</style>
