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

        createMany: procedure.input($Schema.ExpenseRequestInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).expenseRequest.createMany(input as any))),

        create: procedure.input($Schema.ExpenseRequestInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).expenseRequest.create(input as any))),

        deleteMany: procedure.input($Schema.ExpenseRequestInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).expenseRequest.deleteMany(input as any))),

        delete: procedure.input($Schema.ExpenseRequestInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).expenseRequest.delete(input as any))),

        findFirst: procedure.input($Schema.ExpenseRequestInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).expenseRequest.findFirst(input as any))),

        findMany: procedure.input($Schema.ExpenseRequestInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).expenseRequest.findMany(input as any))),

        findUnique: procedure.input($Schema.ExpenseRequestInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).expenseRequest.findUnique(input as any))),

        updateMany: procedure.input($Schema.ExpenseRequestInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).expenseRequest.updateMany(input as any))),

        update: procedure.input($Schema.ExpenseRequestInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).expenseRequest.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.ExpenseRequestCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ExpenseRequestCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ExpenseRequestCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ExpenseRequestCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.ExpenseRequestCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ExpenseRequestCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ExpenseRequestGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ExpenseRequestGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ExpenseRequestCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ExpenseRequestCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ExpenseRequestGetPayload<T>, Context>) => Promise<Prisma.ExpenseRequestGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.ExpenseRequestDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ExpenseRequestDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ExpenseRequestDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ExpenseRequestDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.ExpenseRequestDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ExpenseRequestDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ExpenseRequestGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ExpenseRequestGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ExpenseRequestDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ExpenseRequestDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ExpenseRequestGetPayload<T>, Context>) => Promise<Prisma.ExpenseRequestGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.ExpenseRequestFindFirstArgs, TData = Prisma.ExpenseRequestGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.ExpenseRequestFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ExpenseRequestGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ExpenseRequestFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ExpenseRequestFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ExpenseRequestGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ExpenseRequestGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.ExpenseRequestFindManyArgs, TData = Array<Prisma.ExpenseRequestGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.ExpenseRequestFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.ExpenseRequestGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ExpenseRequestFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ExpenseRequestFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.ExpenseRequestGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.ExpenseRequestGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.ExpenseRequestFindUniqueArgs, TData = Prisma.ExpenseRequestGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.ExpenseRequestFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ExpenseRequestGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ExpenseRequestFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ExpenseRequestFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ExpenseRequestGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ExpenseRequestGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.ExpenseRequestUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ExpenseRequestUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ExpenseRequestUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ExpenseRequestUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.ExpenseRequestUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ExpenseRequestUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ExpenseRequestGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ExpenseRequestGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ExpenseRequestUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ExpenseRequestUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ExpenseRequestGetPayload<T>, Context>) => Promise<Prisma.ExpenseRequestGetPayload<T>>
            };

    };
}
