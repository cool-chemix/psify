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

        createMany: procedure.input($Schema.EventInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).event.createMany(input as any))),

        create: procedure.input($Schema.EventInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).event.create(input as any))),

        deleteMany: procedure.input($Schema.EventInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).event.deleteMany(input as any))),

        delete: procedure.input($Schema.EventInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).event.delete(input as any))),

        findFirst: procedure.input($Schema.EventInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).event.findFirst(input as any))),

        findMany: procedure.input($Schema.EventInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).event.findMany(input as any))),

        findUnique: procedure.input($Schema.EventInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).event.findUnique(input as any))),

        updateMany: procedure.input($Schema.EventInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).event.updateMany(input as any))),

        update: procedure.input($Schema.EventInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).event.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.EventCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.EventCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.EventCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.EventCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.EventCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.EventCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.EventGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.EventGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.EventCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.EventCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.EventGetPayload<T>, Context>) => Promise<Prisma.EventGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.EventDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.EventDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.EventDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.EventDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.EventDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.EventDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.EventGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.EventGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.EventDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.EventDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.EventGetPayload<T>, Context>) => Promise<Prisma.EventGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.EventFindFirstArgs, TData = Prisma.EventGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.EventFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.EventGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.EventFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.EventFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.EventGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.EventGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.EventFindManyArgs, TData = Array<Prisma.EventGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.EventFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.EventGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.EventFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.EventFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.EventGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.EventGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.EventFindUniqueArgs, TData = Prisma.EventGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.EventFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.EventGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.EventFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.EventFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.EventGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.EventGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.EventUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.EventUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.EventUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.EventUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.EventUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.EventUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.EventGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.EventGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.EventUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.EventUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.EventGetPayload<T>, Context>) => Promise<Prisma.EventGetPayload<T>>
            };

    };
}
