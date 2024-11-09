/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@prisma/client';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.MemberRoleInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).memberRole.createMany(input as any))),

        create: procedure.input($Schema.MemberRoleInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).memberRole.create(input as any))),

        deleteMany: procedure.input($Schema.MemberRoleInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).memberRole.deleteMany(input as any))),

        delete: procedure.input($Schema.MemberRoleInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).memberRole.delete(input as any))),

        findFirst: procedure.input($Schema.MemberRoleInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).memberRole.findFirst(input as any))),

        findMany: procedure.input($Schema.MemberRoleInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).memberRole.findMany(input as any))),

        findUnique: procedure.input($Schema.MemberRoleInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).memberRole.findUnique(input as any))),

        updateMany: procedure.input($Schema.MemberRoleInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).memberRole.updateMany(input as any))),

        update: procedure.input($Schema.MemberRoleInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).memberRole.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.MemberRoleCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.MemberRoleCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.MemberRoleCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.MemberRoleCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.MemberRoleCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.MemberRoleCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.MemberRoleGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.MemberRoleGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.MemberRoleCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.MemberRoleCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.MemberRoleGetPayload<T>, Context>) => Promise<Prisma.MemberRoleGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.MemberRoleDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.MemberRoleDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.MemberRoleDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.MemberRoleDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.MemberRoleDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.MemberRoleDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.MemberRoleGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.MemberRoleGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.MemberRoleDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.MemberRoleDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.MemberRoleGetPayload<T>, Context>) => Promise<Prisma.MemberRoleGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.MemberRoleFindFirstArgs, TData = Prisma.MemberRoleGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.MemberRoleFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.MemberRoleGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.MemberRoleFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.MemberRoleFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.MemberRoleGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.MemberRoleGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.MemberRoleFindManyArgs, TData = Array<Prisma.MemberRoleGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.MemberRoleFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.MemberRoleGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.MemberRoleFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.MemberRoleFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.MemberRoleGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.MemberRoleGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.MemberRoleFindUniqueArgs, TData = Prisma.MemberRoleGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.MemberRoleFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.MemberRoleGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.MemberRoleFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.MemberRoleFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.MemberRoleGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.MemberRoleGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.MemberRoleUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.MemberRoleUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.MemberRoleUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.MemberRoleUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.MemberRoleUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.MemberRoleUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.MemberRoleGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.MemberRoleGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.MemberRoleUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.MemberRoleUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.MemberRoleGetPayload<T>, Context>) => Promise<Prisma.MemberRoleGetPayload<T>>
            };

    };
}
