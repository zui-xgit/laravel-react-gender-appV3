{
    formData.evidenceFiles.length > 0 &&
        formData.evidenceDescription.trim() !== '' && (
            <>
                <div className="tborder flex flex-col gap-3">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <Separator className="flex-1" />
                            <h3 className="text-[10px] font-black tracking-[0.4em] whitespace-nowrap text-primary uppercase">
                                Confirmation
                            </h3>
                            <Separator className="flex-1" />
                        </div>

                        <div
                            className={`rounded-2xl border p-6 transition-all ${
                                errors.confirmationChecked
                                    ? 'border-destructive bg-destructive/5'
                                    : 'border-primary/20 bg-primary/5'
                            }`}
                        >
                            <div className="flex items-start gap-4">
                                <Checkbox
                                    id="confirmationChecked"
                                    checked={formData.confirmationChecked}
                                    onCheckedChange={(checked) =>
                                        setFormData({
                                            confirmationChecked:
                                                checked as boolean,
                                        })
                                    }
                                    className="mt-1 h-5 w-5 border-primary data-[state=checked]:bg-primary"
                                />
                                <div className="grid gap-1.5 leading-none">
                                    <Label
                                        htmlFor="confirmationChecked"
                                        className="cursor-pointer text-sm leading-relaxed font-normal text-foreground"
                                    >
                                        I hereby confirm that all the
                                        information provided in this report is
                                        true, accurate, and complete to the best
                                        of my knowledge. I understand that
                                        providing false or misleading
                                        information may result in legal
                                        consequences and undermines the
                                        integrity of this reporting system.
                                    </Label>
                                </div>
                            </div>
                        </div>

                        {errors.confirmationChecked && (
                            <InputError message={errors.confirmationChecked} />
                        )}
                    </div>

                    {/* Privacy Warning */}
                    <div className="rounded-2xl border border-chart-2/20 bg-chart-2/5 p-4 sm:p-6">
                        <div className="flex items-start gap-4">
                            <div className="rounded-full bg-chart-2/10 p-2">
                                <ShieldIcon className="h-5 w-5 text-chart-2" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold text-chart-2">
                                    Privacy & Security
                                </h4>
                                <p className="text-xs leading-relaxed text-muted-foreground">
                                    All uploaded evidence is encrypted and
                                    stored securely. Only authorized personnel
                                    involved in the case investigation will have
                                    access to these files.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
}
