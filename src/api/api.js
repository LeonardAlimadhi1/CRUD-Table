import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const baseAPI = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

const getUsers = async () => {
  const users = await baseAPI.get("/users");
  return users.data;
};

const deleteUser = (id) => {
  return baseAPI.delete(`/users/${id}`);
};

const createUser = (user) => {
  return baseAPI.post("/users", user);
};

const updateUser = (user) => {
  return baseAPI.put(`/users/${user.id}`, user);
};

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (user) =>
      updateUser({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: {
          street: user.street,
          city: user.city,
          zipcode: user.zipcode,
          geo: {
            lat: user.lat,
            lng: user.lng,
          },
        },
      }).then((res) => {
        queryClient.setQueryData(["users"], (old) => {
          return old.map((u) => (u.id === res.data.id ? res.data : u));
        });
      }),
  });

  return updateMutation.mutate;
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (user) =>
      createUser({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        username: user.username,
        address: {
          street: user.street,
          city: user.city,
          zipcode: user.zipcode,
          geo: {
            lat: user.lat,
            lng: user.lng,
          },
        },
      }).then((res) => {
        queryClient.setQueryData(["users"], (old) => {
          res.data.id = old[old.length - 1].id + 1;
          return [...old, res.data];
        });
      }),
  });

  return updateMutation.mutate;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (id) => deleteUser(id),
    onSuccess: (data, payload, context) => {
      queryClient.setQueryData(["users"], (old) => {
        return old.filter((u) => u.id !== payload);
      });
    },
  });

  return updateMutation.mutate;
};
