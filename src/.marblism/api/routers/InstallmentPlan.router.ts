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

        createMany: procedure.input($Schema.InstallmentPlanInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).installmentPlan.createMany(input as any))),

        create: procedure.input($Schema.InstallmentPlanInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).installmentPlan.create(input as any))),

        deleteMany: procedure.input($Schema.InstallmentPlanInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).installmentPlan.deleteMany(input as any))),

        delete: procedure.input($Schema.InstallmentPlanInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).installmentPlan.delete(input as any))),

        findFirst: procedure.input($Schema.InstallmentPlanInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).installmentPlan.findFirst(input as any))),

        findMany: procedure.input($Schema.InstallmentPlanInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).installmentPlan.findMany(input as any))),

        findUnique: procedure.input($Schema.InstallmentPlanInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).installmentPlan.findUnique(input as any))),

        updateMany: procedure.input($Schema.InstallmentPlanInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).installmentPlan.updateMany(input as any))),

        update: procedure.input($Schema.InstallmentPlanInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).installmentPlan.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.InstallmentPlanCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.InstallmentPlanCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.InstallmentPlanCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.InstallmentPlanCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.InstallmentPlanCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.InstallmentPlanCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.InstallmentPlanGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.InstallmentPlanGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.InstallmentPlanCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.InstallmentPlanCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.InstallmentPlanGetPayload<T>, Context>) => Promise<Prisma.InstallmentPlanGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.InstallmentPlanDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.InstallmentPlanDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.InstallmentPlanDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.InstallmentPlanDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.InstallmentPlanDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.InstallmentPlanDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.InstallmentPlanGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.InstallmentPlanGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.InstallmentPlanDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.InstallmentPlanDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.InstallmentPlanGetPayload<T>, Context>) => Promise<Prisma.InstallmentPlanGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.InstallmentPlanFindFirstArgs, TData = Prisma.InstallmentPlanGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.InstallmentPlanFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.InstallmentPlanGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.InstallmentPlanFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.InstallmentPlanFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.InstallmentPlanGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.InstallmentPlanGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.InstallmentPlanFindManyArgs, TData = Array<Prisma.InstallmentPlanGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.InstallmentPlanFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.InstallmentPlanGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.InstallmentPlanFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.InstallmentPlanFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.InstallmentPlanGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.InstallmentPlanGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.InstallmentPlanFindUniqueArgs, TData = Prisma.InstallmentPlanGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.InstallmentPlanFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.InstallmentPlanGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.InstallmentPlanFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.InstallmentPlanFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.InstallmentPlanGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.InstallmentPlanGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.InstallmentPlanUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.InstallmentPlanUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.InstallmentPlanUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.InstallmentPlanUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.InstallmentPlanUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.InstallmentPlanUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.InstallmentPlanGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.InstallmentPlanGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.InstallmentPlanUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.InstallmentPlanUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.InstallmentPlanGetPayload<T>, Context>) => Promise<Prisma.InstallmentPlanGetPayload<T>>
            };

    };
}
